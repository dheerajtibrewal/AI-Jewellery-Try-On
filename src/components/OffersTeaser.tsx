import { motion } from 'motion/react';
import { Gift, ChevronRight } from 'lucide-react';

interface OffersTeaserProps {
  onViewOffers: () => void;
}

export function OffersTeaser({ onViewOffers }: OffersTeaserProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto mt-6 mb-8 bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-primary-dark)] rounded-2xl p-4 shadow-lg border border-[var(--color-brand-secondary)]/30 cursor-pointer group"
      onClick={onViewOffers}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[var(--color-brand-secondary)]/20 p-2 rounded-full">
            <Gift className="text-[var(--color-brand-secondary)]" size={24} />
          </div>
          <div>
            <h3 className="text-[var(--color-brand-secondary)] font-serif text-lg m-0">Gudi Padwa Offers</h3>
            <p className="text-white/80 text-xs md:text-sm">Up to 30% off on diamond value & more*</p>
          </div>
        </div>
        <div className="text-[var(--color-brand-secondary)] flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform">
          View Offers <ChevronRight size={16} />
        </div>
      </div>
    </motion.div>
  );
}
