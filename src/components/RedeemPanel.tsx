import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Copy, Check, MessageCircle } from 'lucide-react';

interface RedeemPanelProps {
  onOpenStoreLocator: () => void;
}

export function RedeemPanel({ onOpenStoreLocator }: RedeemPanelProps) {
  const [voucherCode, setVoucherCode] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [offersCopied, setOffersCopied] = useState(false);

  useEffect(() => {
    let code = localStorage.getItem('indriya_gudi_padwa_voucher');
    if (!code) {
      const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
      code = `GPW-${randomStr}`;
      localStorage.setItem('indriya_gudi_padwa_voucher', code);
    }
    setVoucherCode(code);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(voucherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyOffers = () => {
    const text = `Gudi Padwa Offers:\n- Up to 30% off on diamond value*\n- Up to 20% off on making charges of gold jewellery*\n- Double Gold Rate Protection*\n\nMy Voucher: ${voucherCode}\n\nVisit a store to redeem!`;
    navigator.clipboard.writeText(text);
    setOffersCopied(true);
    setTimeout(() => setOffersCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    let url = 'https://indriyajewellery.com';
    const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    const params = new URLSearchParams();
    utms.forEach(utm => {
      const val = localStorage.getItem(`indriya_${utm}`);
      if (val) params.append(utm, val);
    });
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const text = `Check out these Gudi Padwa Offers:\n- Up to 30% off on diamond value*\n- Up to 20% off on making charges of gold jewellery*\n- Double Gold Rate Protection*\n\nMy Voucher: ${voucherCode}\n\nFind a store: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-primary-dark)] rounded-2xl overflow-hidden shadow-xl mt-8 border border-[var(--color-brand-secondary)]/30"
    >
      <div className="p-6 text-center border-b border-white/10">
        <h3 className="font-serif text-2xl text-[var(--color-brand-secondary)] mb-2">Redeem Your Festive Offers</h3>
        <p className="text-white/80 text-sm max-w-sm mx-auto">
          Show this code at the store to redeem your exclusive Gudi Padwa offers.
        </p>
        
        <div className="mt-6 flex flex-col items-center justify-center">
          <div className="bg-white/10 backdrop-blur-sm border border-[var(--color-brand-secondary)]/50 rounded-xl p-4 flex items-center gap-4">
            <div className="text-left">
              <span className="text-xs text-[var(--color-brand-secondary)] uppercase tracking-wider font-semibold">Your Voucher</span>
              <div className="text-2xl font-mono font-bold text-white tracking-widest">{voucherCode}</div>
            </div>
            <button 
              onClick={handleCopyCode}
              className="bg-[var(--color-brand-secondary)] text-[var(--color-brand-primary)] p-2 rounded-lg hover:bg-white transition-colors"
              title="Copy Code"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white flex flex-col gap-4">
        <button 
          onClick={onOpenStoreLocator}
          className="w-full py-4 bg-[var(--color-brand-primary)] text-white rounded-xl font-medium hover:bg-[var(--color-brand-primary-dark)] transition-all flex items-center justify-center gap-3 text-lg shadow-md active:scale-[0.98]"
        >
          <MapPin size={22} />
          Find a Store
        </button>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <button 
            onClick={handleCopyOffers}
            className="flex-1 py-3.5 border border-[var(--color-brand-primary)]/20 text-[var(--color-brand-primary)] rounded-xl font-semibold hover:bg-[var(--color-brand-bg)] transition-all flex items-center justify-center gap-2 text-sm active:scale-[0.98]"
          >
            {offersCopied ? <Check size={18} /> : <Copy size={18} />}
            Copy Offers
          </button>
          <button 
            onClick={handleWhatsApp}
            className="flex-1 py-3.5 bg-[#25D366]/10 text-[#128C7E] rounded-xl font-semibold hover:bg-[#25D366]/20 transition-all flex items-center justify-center gap-2 text-sm active:scale-[0.98]"
          >
            <MessageCircle size={18} />
            WhatsApp This
          </button>
        </div>
      </div>
    </motion.div>
  );
}
