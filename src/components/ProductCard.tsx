import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { JewelryItem } from '../types';

interface ProductCardProps {
  item: JewelryItem;
}

export function ProductCard({ item }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white/60 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,35,102,0.1)] border border-[var(--color-gold-light)]/30 flex flex-col gap-6 silk-texture"
    >
      <div className="flex flex-col gap-1">
        <span className="text-[var(--color-brand-secondary)] uppercase text-[10px] font-bold tracking-[0.4em]">The Selection</span>
        <h3 className="font-serif text-3xl text-[var(--color-brand-primary)] tracking-tight leading-none">{item.name}</h3>
        <p className="text-[var(--color-brand-secondary)] font-serif italic text-xl mt-2">{item.price}</p>
      </div>
      
      <div className="h-px w-full bg-[var(--color-gold-light)]/20" />
      
      <a 
        href={item.productUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-3 bg-royal-gradient text-white px-10 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] hover:shadow-2xl hover:shadow-[var(--color-brand-primary)]/30 transition-all border border-white/10"
      >
        <span>Discover More</span>
        <ExternalLink size={14} />
      </a>
    </motion.div>
  );
}
