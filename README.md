# 💎 AI Jewellery Try-On

**Realistic virtual jewellery fitting powered by generative AI**

Upload a photo or capture a selfie, browse curated collections, and watch as AI places jewellery onto your image with precision—accounting for lighting, skin tone, hair occlusion, and natural body contours.

## ✨ Features

- **Realistic Placement** — AI understands spatial relationships and naturally layers jewellery behind hair and clothing
- **Multi-Category Support** — Necklaces, earrings, rings, and bangles, each with category-specific placement logic
- **Mobile-First Design** — Fully responsive experience optimized for phones and tablets
- **Privacy-Conscious** — All image processing happens client-side; raw uploads are never stored
- **Fast Generation** — Exponential backoff retry logic ensures reliable API calls
- **One-Click Download** — Composite results with branding overlay via Canvas

## 🛠 Tech Stack

- **React 19** + TypeScript for UI components
- **Vite** for fast bundling and dev server
- **Tailwind CSS 4** for styling
- **Motion** (Framer Motion) for smooth animations
- **Lucide React** for icon set
- **Gemini 2.5 Flash** for generative image placement
- **HTML5 Canvas** for image compositing and downloads

## 🚀 How It Works

1. **Upload or Capture** — Provide a photo via file upload or live camera feed
2. **Browse & Select** — Choose a jewellery category and item from the curated collection
3. **Optimize & Send** — App resizes images (512px target) and compresses for API efficiency
4. **Generate** — Gemini receives both the user photo and jewellery reference with placement instructions
5. **Retrieve & Download** — View the realistic result and download with branding overlay

## 🚀 Getting Started

**Requirements:** Node.js 16+

```bash
# Install dependencies
npm install

# Set up API key
# Add GEMINI_API_KEY to .env.local

# Run locally
npm run dev
```

Visit `http://localhost:5173` to start trying on jewellery.

## 📸 Screenshots

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/5f1c512e-c628-4bd6-9cce-fc9bdf203930" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/875f21ca-c000-4312-bc5d-cae8f1eb3f6e" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/1c43ad48-233e-40a8-a62a-237cf50f27a4" width="250"/></td>
  </tr>
  <tr>
    <td align="center"><em>Landing Page</em></td>
    <td align="center"><em>Upload / Camera</em></td>
    <td align="center"><em>Jewellery Collection</em></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/3914627b-af96-4d16-af7a-801c1b0e75b0" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/1417515a-0b28-42d3-af72-690674249ff3" width="250"/></td>
    <td><img src="https://github.com/user-attachments/assets/80822961-0ae1-4ccc-a650-35f4112b0468" width="250"/></td>
    <td></td>
  </tr>
  <tr>
    <td align="center"><em>AI Generation</em></td>
    <td align="center"><em>Final Result + Download</em></td>
    <td align="center"><em>Redeem Offer</em></td>
    <td></td>
  </tr>
</table>



Built as a creative technology POC exploring AI-powered commerce experiences.
