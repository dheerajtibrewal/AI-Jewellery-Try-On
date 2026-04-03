import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, ExternalLink } from 'lucide-react';

interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORES = [
  { name: "Andheri (W)", query: "Indriya Jewellery Andheri West" },
  { name: "Borivali (W) – Gulmohar Road", query: "Indriya Jewellery Borivali West Gulmohar Road" },
  { name: "Sky City Mall, Borivali (E)", query: "Indriya Jewellery Sky City Mall Borivali East" },
  { name: "R-City Mall", query: "Indriya Jewellery R-City Mall Ghatkopar" },
  { name: "Nexus Seawoods Mall", query: "Indriya Jewellery Nexus Seawoods Mall Navi Mumbai" }
];

export function StoreLocatorModal({ isOpen, onClose }: StoreLocatorModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[var(--color-brand-surface)] rounded-2xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-[var(--color-brand-secondary-light)]"
        >
          <div className="bg-[var(--color-brand-primary)] p-8 text-center relative shrink-0">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-[var(--color-brand-secondary)]/70 hover:text-[var(--color-brand-secondary)] transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="font-display text-2xl text-[var(--color-brand-secondary)] mb-2 tracking-wide">Find a Store</h2>
            <p className="text-[var(--color-brand-secondary-light)]/80 text-xs font-light tracking-widest uppercase">Visit us to redeem your festive offers</p>
          </div>
          
          <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-3">
            {STORES.map((store, idx) => (
              <a 
                key={idx}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.query)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border border-[var(--color-brand-secondary-light)] hover:border-[var(--color-brand-secondary)] hover:bg-[var(--color-brand-bg)] transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[var(--color-brand-secondary)]/10 p-2.5 rounded-full text-[var(--color-brand-primary)] border border-[var(--color-brand-secondary)]/20">
                    <MapPin size={18} />
                  </div>
                  <span className="font-serif text-lg text-[var(--color-brand-primary)] group-hover:text-[var(--color-brand-secondary)] transition-colors">{store.name}</span>
                </div>
                <ExternalLink size={16} className="text-[var(--color-brand-text-muted)] group-hover:text-[var(--color-brand-secondary)] transition-colors" />
              </a>
            ))}
          </div>

          <div className="bg-[var(--color-brand-bg)] p-5 text-center border-t border-[var(--color-brand-secondary-light)] shrink-0">
            <button 
              onClick={onClose}
              className="text-xs text-[var(--color-brand-primary)] font-medium tracking-widest uppercase hover:text-[var(--color-brand-secondary)] transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
