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

![Demo](./assets/demo.gif)

---

Built as a creative technology POC exploring AI-powered commerce experiences.
