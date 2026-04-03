import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function CampaignHeader() {
  return (
    <div className="w-full bg-royal-deep text-white py-4 px-4 text-center relative overflow-hidden border-b border-[var(--color-brand-secondary)]/30 silk-texture">
      {/* Subtle festive pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--color-brand-secondary) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center justify-center gap-1"
      >
        <h1 className="font-serif text-2xl md:text-3xl text-gold-gradient flex items-center gap-4 font-semibold tracking-tight">
          <Sparkles size={24} className="text-[var(--color-brand-secondary)]" />
          Gudi Padwa Shubh Aarambh
          <Sparkles size={24} className="text-[var(--color-brand-secondary)]" />
        </h1>
        <p className="text-[10px] md:text-xs opacity-60 font-bold tracking-[0.4em] uppercase mt-1">
          Celebrate New Beginnings with Timeless Elegance
        </p>
      </motion.div>
    </div>
  );
}
