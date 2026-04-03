import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShoppingBag, Loader2, ArrowLeft, Gift } from 'lucide-react';
import { JEWELRY_COLLECTION } from './data/jewelry';
import { JewelryItem, JewelryCategory } from './types';
import { generateTryOn } from './services/gemini';
import { JewelrySelector } from './components/JewelrySelector';
import { ImageUploader } from './components/ImageUploader';
import { PreviewStage } from './components/PreviewStage';
import { ProductCard } from './components/ProductCard';
import { CategorySelector } from './components/CategorySelector';
import { CampaignHeader } from './components/CampaignHeader';
import { OffersTeaser } from './components/OffersTeaser';
import { OffersModal } from './components/OffersModal';
import { StoreLocatorModal } from './components/StoreLocatorModal';
import { RedeemPanel } from './components/RedeemPanel';

export default function App() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<JewelryCategory | null>(null);
  const [selectedJewelry, setSelectedJewelry] = useState<JewelryItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isOffersModalOpen, setIsOffersModalOpen] = useState(false);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    utms.forEach(utm => {
      const val = params.get(utm);
      if (val) localStorage.setItem(`indriya_${utm}`, val);
    });
  }, []);

  const filteredJewelry = useMemo(() => {
    if (!selectedCategory) return [];
    return JEWELRY_COLLECTION.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleImageSelect = useCallback((base64: string) => {
    setUserImage(base64);
    setGeneratedImage(null);
    setSelectedCategory(null);
    setSelectedJewelry(null);
    setError(null);
  }, []);

  const handleCategorySelect = useCallback((category: JewelryCategory) => {
    setSelectedCategory(category);
    setSelectedJewelry(null);
  }, []);

  const handleBackToCategories = useCallback(() => {
    setSelectedCategory(null);
    setSelectedJewelry(null);
    setGeneratedImage(null);
  }, []);

  const handleJewelrySelect = useCallback(async (item: JewelryItem) => {
    if (!userImage) return;
    if (isGenerating) return;

    setSelectedJewelry(item);
    setIsGenerating(true);
    setError(null);

    try {
      // Remove the data:image/jpeg;base64, prefix for the API call
      const base64Data = userImage.split(',')[1];
      const result = await generateTryOn(base64Data, item);
      setGeneratedImage(result);
    } catch (err: any) {
      console.error("Generation failed:", err);
      setError(err.message || "Failed to generate try-on. Please try again.");
      setSelectedJewelry(null);
    } finally {
      setIsGenerating(false);
    }
  }, [userImage, isGenerating]);

  const handleReset = useCallback(() => {
    setUserImage(null);
    setGeneratedImage(null);
    setSelectedCategory(null);
    setSelectedJewelry(null);
    setError(null);
  }, []);

  const handleDownload = useCallback(() => {
    if (generatedImage && selectedJewelry) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Set canvas size to match image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the main image
        ctx?.drawImage(img, 0, 0);
        
        if (ctx) {
          // Add Branding Overlay at top left
          const padding = canvas.width * 0.03;
          const bannerWidth = canvas.width * 0.25;
          const bannerHeight = canvas.height * 0.08;
          
          // Subtle gradient background for branding
          const gradient = ctx.createLinearGradient(padding, padding, padding + bannerWidth, padding + bannerHeight);
          gradient.addColorStop(0, 'rgba(0, 35, 102, 0.85)');
          gradient.addColorStop(1, 'rgba(0, 21, 64, 0.85)');
          
          ctx.fillStyle = gradient;
          // Rounded rectangle for branding
          const r = 12;
          ctx.beginPath();
          ctx.moveTo(padding + r, padding);
          ctx.lineTo(padding + bannerWidth - r, padding);
          ctx.quadraticCurveTo(padding + bannerWidth, padding, padding + bannerWidth, padding + r);
          ctx.lineTo(padding + bannerWidth, padding + bannerHeight - r);
          ctx.quadraticCurveTo(padding + bannerWidth, padding + bannerHeight, padding + bannerWidth - r, padding + bannerHeight);
          ctx.lineTo(padding + r, padding + bannerHeight);
          ctx.quadraticCurveTo(padding, padding + bannerHeight, padding, padding + bannerHeight - r);
          ctx.lineTo(padding, padding + r);
          ctx.quadraticCurveTo(padding, padding, padding + r, padding);
          ctx.closePath();
          ctx.fill();
          
          // Add "AI TRY-ON" text
          ctx.fillStyle = '#D4AF37'; // Gold
          const fontSize = Math.floor(bannerHeight * 0.45);
          ctx.font = `bold ${fontSize}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('AI TRY-ON', padding + bannerWidth / 2, padding + bannerHeight / 2);
          
          // Add subtle border to branding
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        
        // Generate filename: try_on_(jewelry_name)_timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const safeJewelryName = selectedJewelry.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
        const fileName = `try_on_${safeJewelryName}_${timestamp}.jpg`;
        
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg', 0.95);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      
      img.src = generatedImage;
    }
  }, [generatedImage, selectedJewelry]);

  return (
    <div className="min-h-screen bg-[var(--color-brand-bg)] flex flex-col font-sans text-stone-800 relative noise-overlay">
      {/* Header */}
      <header className="w-full bg-white border-b border-[var(--color-gold-light)]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-2xl font-bold text-[var(--color-brand-primary)] tracking-widest uppercase"
          >
            AI TRY-ON
          </motion.h1>
        </div>
      </header>

      {!userImage && <CampaignHeader />}

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-12">
        
        {/* Main Stage */}
        <section className="w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!userImage ? (
              <motion.div 
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-center"
              >
                <div className="text-center mb-10 max-w-2xl px-4">
                  <h2 className="font-serif text-5xl md:text-7xl mb-6 text-[var(--color-brand-primary)] tracking-tighter leading-tight">
                    Virtual <span className="text-gold-gradient italic">Try-On</span>
                  </h2>
                  <p className="text-[var(--color-brand-text)] opacity-60 max-w-md mx-auto text-lg font-light leading-relaxed">
                    Experience the heritage of craftsmanship through our curated collections.
                  </p>
                </div>
                
                <div className="w-full max-w-2xl flex flex-col gap-8">
                  <ImageUploader onImageSelect={handleImageSelect} />
                  <OffersTeaser onViewOffers={() => setIsOffersModalOpen(true)} />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-6xl flex flex-col lg:grid lg:grid-cols-12 gap-12"
              >
                {/* Left Side: Preview */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                    <div className="flex justify-between items-end border-b border-[var(--color-gold-light)]/20 pb-8">
                      <div>
                        <h2 className="font-serif text-5xl text-[var(--color-brand-primary)] tracking-tight">
                          {generatedImage ? "Your Masterpiece" : (selectedCategory ? `Exquisite ${selectedCategory}` : "Curate Your Look")}
                        </h2>
                        <p className="text-lg text-[var(--color-brand-text)] opacity-50 mt-2 font-light italic">
                          {generatedImage 
                            ? `Featuring the ${selectedJewelry?.name}` 
                            : (selectedCategory ? "Select a piece to visualize your elegance" : "Begin your journey by choosing a category")}
                        </p>
                      </div>
                      {selectedCategory && !isGenerating && !generatedImage && (
                        <button 
                          onClick={handleBackToCategories}
                          className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--color-brand-primary)] hover:text-[var(--color-brand-secondary)] flex items-center gap-2 transition-colors"
                        >
                          <ArrowLeft size={14} />
                          Back
                        </button>
                      )}
                    </div>

                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl text-sm font-medium flex items-center gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        {error}
                      </motion.div>
                    )}

                    <div className="relative rounded-[3rem] overflow-hidden royal-shadow bg-white border-[16px] border-white ring-1 ring-[var(--color-gold-light)]/30">
                     <PreviewStage 
                       image={generatedImage || userImage} 
                       isGenerating={isGenerating}
                       onReset={handleReset}
                       onDownload={generatedImage ? handleDownload : undefined}
                     />
                  </div>
                </div>

                {/* Right Side: Selection */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                  <div className="w-full">
                    {!selectedCategory ? (
                      <CategorySelector onSelect={handleCategorySelect} />
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-6"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-px flex-1 bg-[var(--color-gold-light)]/30" />
                          <h3 className="text-[10px] font-bold text-[var(--color-brand-primary)] uppercase tracking-[0.4em]">
                            {selectedCategory} Collection
                          </h3>
                          <div className="h-px flex-1 bg-[var(--color-gold-light)]/30" />
                        </div>
                        
                        {filteredJewelry.length > 0 ? (
                          <JewelrySelector 
                            items={filteredJewelry}
                            selectedId={selectedJewelry?.id || null}
                            onSelect={handleJewelrySelect}
                            disabled={isGenerating}
                          />
                        ) : (
                          <div className="text-center py-20 text-[var(--color-brand-text)] opacity-40 bg-white/20 rounded-[2rem] border border-dashed border-[var(--color-gold-light)]/30">
                            Awaiting new arrivals...
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Product Card */}
                  <AnimatePresence>
                    {selectedJewelry && !isGenerating && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="w-full"
                      >
                        <ProductCard item={selectedJewelry} />
                        {generatedImage && (
                          <RedeemPanel onOpenStoreLocator={() => setIsStoreLocatorOpen(true)} />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </main>

      <OffersModal isOpen={isOffersModalOpen} onClose={() => setIsOffersModalOpen(false)} />
      <StoreLocatorModal isOpen={isStoreLocatorOpen} onClose={() => setIsStoreLocatorOpen(false)} />

      {/* Footer */}
      <footer className="w-full bg-royal-gradient text-white/90 py-12 mt-auto border-t border-[var(--color-brand-secondary)]/20">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold opacity-50 mb-2">Crafted for Elegance</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
