import { JewelryItem } from '../types';
import { motion } from 'motion/react';

interface JewelrySelectorProps {
  items: JewelryItem[];
  selectedId: string | null;
  onSelect: (item: JewelryItem) => void;
  disabled?: boolean;
}

export function JewelrySelector({ items, selectedId, onSelect, disabled }: JewelrySelectorProps) {
  return (
    <div className="w-full py-4 overflow-x-auto no-scrollbar">
      <div className="flex space-x-8 px-4 min-w-max">
        {items.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => !disabled && onSelect(item)}
            whileTap={{ scale: 0.95 }}
            className={`relative flex flex-col items-center p-5 rounded-[2rem] transition-all duration-700 ${
              selectedId === item.id
                ? 'bg-white ring-1 ring-[var(--color-brand-secondary)]/50 shadow-[0_20px_40px_-12px_rgba(0,35,102,0.15)] scale-105 z-10'
                : 'bg-white/30 backdrop-blur-sm hover:bg-white border border-[var(--color-gold-light)]/20 hover:shadow-xl'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            style={{ width: '200px' }}
          >
            <div className="w-40 h-40 rounded-2xl overflow-hidden mb-5 bg-[var(--color-brand-bg)] border border-[var(--color-gold-light)]/10 shadow-inner">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                loading="lazy"
              />
            </div>
            <span className={`text-base font-serif tracking-tight text-center line-clamp-1 px-2 ${
              selectedId === item.id ? 'text-[var(--color-brand-primary)] font-semibold' : 'text-[var(--color-brand-text)]'
            }`}>
              {item.name}
            </span>
            <span className="text-sm text-[var(--color-brand-secondary)] font-serif mt-2 font-medium italic opacity-80">
              {item.price}
            </span>
            {selectedId === item.id && (
              <motion.div
                layoutId="selection-indicator"
                className="absolute -bottom-3 w-1.5 h-1.5 bg-gold-gradient rounded-full gold-glow"
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
