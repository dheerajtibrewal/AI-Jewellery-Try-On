import { motion } from 'motion/react';
import { JewelryCategory } from '../types';
import { 
  Circle, 
  Gem, 
  Link, 
  Heart, 
  Watch, 
  Crown, 
  Sparkles, 
  Hexagon 
} from 'lucide-react';

interface CategorySelectorProps {
  onSelect: (category: JewelryCategory) => void;
}

const CATEGORIES: JewelryCategory[] = [
  'Earrings',
  'Rings',
  'Necklaces',
  'Bangles',
  'Mangalsutras',
  'Pendants',
  'Bracelets',
  'Chains'
];

const CategoryIcon = ({ category }: { category: JewelryCategory }) => {
  switch (category) {
    case 'Earrings': return <Sparkles className="w-8 h-8 text-[var(--color-brand-secondary)]" />;
    case 'Rings': return <Circle className="w-8 h-8 text-[var(--color-brand-secondary)]" />;
    case 'Necklaces': return <Gem className="w-8 h-8 text-[var(--color-brand-secondary)]" />;
    case 'Bangles': return <Circle className="w-8 h-8 text-[var(--color-brand-secondary)] border-dashed" />; // Using Circle as base
    case 'Mangalsutras': return <Heart className="w-8 h-8 text-[var(--color-brand-secondary)]" />;
    case 'Pendants': return <Hexagon className="w-8 h-8 text-[var(--color-brand-secondary)]" />;
    case 'Bracelets': return <Watch className="w-8 h-8 text-[var(--color-brand-secondary)]" />;
    case 'Chains': return <Link className="w-8 h-8 text-[var(--color-brand-secondary)]" />;
    default: return <Crown className="w-8 h-8 text-[var(--color-brand-secondary)]" />;
  }
};

export function CategorySelector({ onSelect }: CategorySelectorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-[var(--color-gold-light)]/20" />
        <h3 className="text-[10px] font-bold text-[var(--color-brand-primary)] uppercase tracking-[0.4em]">
          Collections
        </h3>
        <div className="h-px flex-1 bg-[var(--color-gold-light)]/20" />
      </div>
      
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        {CATEGORIES.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => onSelect(category)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center justify-center p-6 bg-white/40 backdrop-blur-md border border-[var(--color-gold-light)]/20 rounded-3xl hover:border-[var(--color-brand-secondary)]/50 transition-all group shadow-sm"
          >
            <div className="w-12 h-12 mb-4 rounded-full bg-white flex items-center justify-center group-hover:bg-royal-gradient transition-all duration-500 shadow-inner border border-[var(--color-gold-light)]/10">
              <div className="group-hover:text-white transition-colors duration-500 transform group-hover:scale-110">
                <CategoryIcon category={category} />
              </div>
            </div>
            <span className="font-serif text-base text-[var(--color-brand-primary)] group-hover:text-[var(--color-brand-primary-dark)] transition-colors tracking-tight font-medium">
              {category}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
