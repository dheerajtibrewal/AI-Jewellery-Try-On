import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, ShieldCheck, Percent } from 'lucide-react';

interface OffersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OffersModal({ isOpen, onClose }: OffersModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[var(--color-brand-surface)] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-[var(--color-brand-secondary-light)]"
        >
          <div className="bg-[var(--color-brand-primary)] p-8 text-center relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-[var(--color-brand-secondary)]/70 hover:text-[var(--color-brand-secondary)] transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="font-display text-2xl text-[var(--color-brand-secondary)] mb-2 tracking-wide">Gudi Padwa Offers</h2>
            <p className="text-[var(--color-brand-secondary-light)]/80 text-xs font-light tracking-widest uppercase">Exclusive festive benefits</p>
          </div>
          
          <div className="p-6 flex flex-col gap-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-brand-bg)] border border-[var(--color-brand-secondary-light)]">
              <div className="bg-[var(--color-brand-secondary)]/10 p-2.5 rounded-full text-[var(--color-brand-primary)] shrink-0 border border-[var(--color-brand-secondary)]/20">
                <Percent size={18} />
              </div>
              <div>
                <h4 className="font-serif text-lg text-[var(--color-brand-primary)]">Up to 30% off</h4>
                <p className="text-xs text-[var(--color-brand-text-muted)] mt-1 uppercase tracking-wider">on diamond value*</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-brand-bg)] border border-[var(--color-brand-secondary-light)]">
              <div className="bg-[var(--color-brand-secondary)]/10 p-2.5 rounded-full text-[var(--color-brand-primary)] shrink-0 border border-[var(--color-brand-secondary)]/20">
                <Gift size={18} />
              </div>
              <div>
                <h4 className="font-serif text-lg text-[var(--color-brand-primary)]">Up to 20% off</h4>
                <p className="text-xs text-[var(--color-brand-text-muted)] mt-1 uppercase tracking-wider">on making charges of gold jewellery*</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-[var(--color-brand-bg)] border border-[var(--color-brand-secondary-light)]">
              <div className="bg-[var(--color-brand-secondary)]/10 p-2.5 rounded-full text-[var(--color-brand-primary)] shrink-0 border border-[var(--color-brand-secondary)]/20">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="font-serif text-lg text-[var(--color-brand-primary)]">Double Gold Rate Protection</h4>
                <p className="text-[10px] text-[var(--color-brand-text-muted)] mt-1.5 leading-relaxed">Pay 25% advance to secure lower gold rate between booking date & billing date*</p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-brand-bg)] p-5 text-center border-t border-[var(--color-brand-secondary-light)]">
            <p className="text-[10px] text-[var(--color-brand-text-muted)] uppercase tracking-widest mb-4">*T&C Apply. Offers valid for a limited period.</p>
            <button 
              onClick={onClose}
              className="w-full py-3.5 bg-[var(--color-brand-primary)] text-[var(--color-brand-secondary)] rounded-xl text-xs font-medium tracking-widest uppercase hover:bg-[var(--color-brand-primary-dark)] transition-colors shadow-md"
            >
              Continue
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
