import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Download, RefreshCw } from 'lucide-react';
import { JewelryItem } from '../types';
import { ProductCard } from './ProductCard';

interface PreviewStageProps {
  image: string;
  isGenerating: boolean;
  onReset: () => void;
  onDownload?: () => void;
}

export function PreviewStage({ image, isGenerating, onReset, onDownload }: PreviewStageProps) {
  return (
    <div className="relative w-full aspect-[3/4] md:aspect-[4/3] bg-[var(--color-brand-bg)] rounded-2xl overflow-hidden shadow-sm border border-[var(--color-brand-secondary-light)]">
      <motion.img 
        key={image}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        src={image} 
        alt="Preview" 
        className="w-full h-full object-cover"
      />
      
      {isGenerating && (
        <div className="absolute inset-0 bg-[var(--color-brand-primary)]/80 backdrop-blur-sm flex flex-col items-center justify-center text-white z-10">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 size={40} className="mb-4 text-[var(--color-brand-secondary)]" />
          </motion.div>
          <p className="font-serif text-xl tracking-wide text-[var(--color-brand-secondary)] text-center px-4">Preparing your festive look...</p>
          <p className="text-[10px] opacity-80 mt-2 font-light tracking-widest uppercase">This may take a few seconds</p>
        </div>
      )}

      {!isGenerating && (
        <div className="absolute top-4 right-4 flex gap-2 z-20">
           {onDownload && (
            <button 
              onClick={onDownload}
              className="p-2.5 bg-[var(--color-brand-surface)]/90 backdrop-blur-md rounded-full text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-[var(--color-brand-secondary)] transition-all shadow-sm border border-[var(--color-brand-secondary-light)]"
              title="Download Image"
            >
              <Download size={18} />
            </button>
          )}
          <button 
            onClick={onReset}
            className="p-2.5 bg-[var(--color-brand-surface)]/90 backdrop-blur-md rounded-full text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-[var(--color-brand-secondary)] transition-all shadow-sm border border-[var(--color-brand-secondary-light)]"
            title="Start Over"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
