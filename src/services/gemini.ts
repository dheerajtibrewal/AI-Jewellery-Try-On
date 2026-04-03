import { GoogleGenAI } from "@google/genai";
import { JewelryItem } from "../types";

// Initialize Gemini AI
const getAiClient = () => {
  // Check multiple possible environment variable names for maximum compatibility on Vercel
  const apiKey = 
    process.env.GEMINI_API_KEY || 
    process.env.API_KEY || 
    (import.meta as any).env?.VITE_GEMINI_API_KEY ||
    (import.meta as any).env?.VITE_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set. Please ensure it is added to your Vercel environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Converts a File or Blob to a base64 string
 */
export const fileToBase64 = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // Remove the data:image/jpeg;base64, prefix
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
};

/**
 * Fetches an image from a URL and converts it to base64
 */
export const urlToBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return fileToBase64(blob);
};

/**
 * Resizes an image to reduce token load and improve API performance
 * Using 512px as a safe limit for TPM (Tokens Per Minute) quotas
 */
export const resizeImage = (base64Str: string, maxWidth = 512, maxHeight = 512): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = `data:image/jpeg;base64,${base64Str}`;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      // Use a lower quality (0.7) to significantly reduce token count
      resolve(canvas.toDataURL('image/jpeg', 0.7).split(',')[1]);
    };
    img.onerror = () => resolve(base64Str); // Fallback to original if resizing fails
  });
};

/**
 * Helper for exponential backoff on 429 errors
 */
const callWithRetry = async <T>(fn: () => Promise<T>, maxRetries = 5, initialDelay = 5000): Promise<T> => {
  let delay = initialDelay;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      const isRateLimit = error.status === 429 || 
                          error.message?.includes("429") || 
                          error.message?.includes("Resource has been exhausted");
      
      if (isRateLimit && i < maxRetries - 1) {
        // Add significant jitter to the delay to avoid thundering herd
        const jitter = Math.random() * 2000;
        const totalDelay = delay + jitter;
        console.warn(`Rate limit hit (429), retrying in ${Math.round(totalDelay)}ms (attempt ${i + 1}/${maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, totalDelay));
        delay *= 2; // Exponential backoff
        continue;
      }
      throw error;
    }
  }
  throw new Error("Max retries exceeded");
};

export const generateTryOn = async (userImageBase64: string, jewelry: JewelryItem): Promise<string> => {
  const ai = getAiClient();
  
  console.log("Starting try-on generation for item:", jewelry.name);

  // Resize user image to 512px to minimize TPM usage
  const optimizedUserImage = await resizeImage(userImageBase64, 512, 512);

  // Fetch the jewelry image and convert to base64
  let jewelryImageBase64 = '';
  try {
    const originalJewelryBase64 = await urlToBase64(jewelry.imageUrl);
    jewelryImageBase64 = await resizeImage(originalJewelryBase64, 512, 512); 
    console.log("Successfully fetched and optimized jewelry image");
  } catch (e) {
    console.warn("Failed to fetch jewelry image for context", e);
  }

  // Construct a category-specific prompt
  let placementInstruction = "around the person's neck";
  if (jewelry.category === 'Earrings') placementInstruction = "on the person's ears";
  if (jewelry.category === 'Rings') placementInstruction = "on the person's finger";
  if (jewelry.category === 'Bangles' || jewelry.category === 'Bracelets') placementInstruction = "on the person's wrist";
  
  // Using the exact prompt from your reference script
  const prompt = `Edit this image to realistically place the ${jewelry.category.toLowerCase()} shown in the second image ${placementInstruction}. 
  ${jewelry.prompt ? `The item is: ${jewelry.prompt}.` : ''}
  Ensure the item follows the natural curves of the body part, has realistic lighting and shadows, and interacts naturally with skin, hair, and clothing (occlusion).
  Maintain the original person's appearance and background exactly, only adding the jewelry.`;

  console.log("Generation prompt:", prompt);

  const parts: any[] = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: optimizedUserImage,
      },
    },
    ...(jewelryImageBase64 ? [{
      inlineData: {
        mimeType: "image/jpeg",
        data: jewelryImageBase64,
      },
    }] : []),
    { text: prompt }
  ];

  const executeApiCall = async () => {
    // Using gemini-2.5-flash-image as requested
    console.log("Calling Gemini API with model: gemini-2.5-flash-image");
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: parts,
      },
    });

    console.log("Gemini API response received");

    // Check for safety filters or recitation issues
    if (response.candidates?.[0]?.finishReason === 'IMAGE_RECITATION') {
      throw new Error("IMAGE_RECITATION");
    }

    // Extract the generated image
    const candidates = response.candidates;
    if (candidates && candidates.length > 0 && candidates[0].content) {
      const parts = candidates[0].content.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData) {
            console.log("Image generation successful");
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
        }
      }
    }
    
    throw new Error("No image generated");
  };

  try {
    return await callWithRetry(executeApiCall);
  } catch (error: any) {
    console.error("Gemini API Error Details:", error);
    
    // Handle specific API errors
    if (error.status === 429 || error.message?.includes("429") || error.message?.includes("Resource has been exhausted")) {
      throw new Error("The AI service is currently at capacity. This is often due to TPM (Tokens Per Minute) limits on the Gemini API. Please wait a moment and try again.");
    }
    
    if (error.message === "IMAGE_RECITATION" || error.message?.includes("IMAGE_RECITATION")) {
      throw new Error("The AI could not generate this specific look due to safety filters. Try another piece of jewelry.");
    }

    throw new Error(error.message || "Failed to generate try-on. Please try again.");
  }
};
