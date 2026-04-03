import { useState, useRef, useCallback, useEffect, ChangeEvent } from 'react';
import { Camera, Upload, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageUploaderProps {
  onImageSelect: (base64: string) => void;
}

export function ImageUploader({ onImageSelect }: ImageUploaderProps) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onImageSelect(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startStream = async () => {
      if (isCameraOpen) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'user' } 
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
          alert("Could not access camera. Please check permissions.");
          setIsCameraOpen(false);
        }
      }
    };

    startStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      streamRef.current = null;
    };
  }, [isCameraOpen]);

  const handleStartCamera = () => setIsCameraOpen(true);
  
  const handleStopCamera = () => setIsCameraOpen(false);

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Mirror the image
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoRef.current, 0, 0);
        const base64 = canvas.toDataURL('image/jpeg');
        onImageSelect(base64);
        handleStopCamera();
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white/40 backdrop-blur-md rounded-[3rem] border border-[var(--color-gold-light)]/30 relative overflow-hidden min-h-[550px] royal-shadow hover:border-[var(--color-brand-secondary)]/30 transition-all duration-1000 group silk-texture">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      <AnimatePresence>
        {isCameraOpen ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-stone-950 flex flex-col"
          >
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover transform -scale-x-100 opacity-80" // Mirror the video
            />
            <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none" />
            <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center gap-12">
              <button 
                onClick={handleStopCamera}
                className="p-5 bg-white/5 backdrop-blur-2xl rounded-full text-white hover:bg-white/10 transition-all border border-white/10"
              >
                <X size={32} />
              </button>
              <button 
                onClick={handleCapture}
                className="w-24 h-24 bg-white rounded-full border-4 border-[var(--color-brand-secondary)] flex items-center justify-center hover:scale-110 transition-all shadow-[0_0_50px_rgba(212,175,55,0.5)]"
              >
                <div className="w-16 h-16 bg-royal-deep rounded-full silk-texture" />
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center gap-8 p-10 text-center relative z-10">
            <div className="space-y-4">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 bg-white rounded-2xl shadow-xl shadow-[var(--color-brand-primary)]/5 flex items-center justify-center mx-auto mb-6 border border-[var(--color-gold-light)]/20 transition-all duration-500"
              >
                <Sparkles className="w-8 h-8 text-gold-gradient" />
              </motion.div>
              <h3 className="text-3xl md:text-4xl font-serif font-medium text-[var(--color-brand-primary)] tracking-tight">
                Begin Your <span className="text-gold-gradient italic">Transformation</span>
              </h3>
              <p className="text-[var(--color-brand-text)] opacity-50 text-base max-w-xs mx-auto leading-relaxed font-light">
                Adorn yourself with the timeless heritage of craftsmanship.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
              <button 
                onClick={handleStartCamera}
                className="flex-1 flex items-center justify-center gap-3 bg-royal-deep text-white px-6 py-4 rounded-xl hover:shadow-lg transition-all border border-white/5"
              >
                <Camera size={20} />
                <span className="font-bold tracking-[0.2em] uppercase text-[10px]">Use Camera</span>
              </button>
              
              <label className="flex-1 flex items-center justify-center gap-3 bg-white text-[var(--color-brand-primary)] border border-[var(--color-gold-light)]/30 px-6 py-4 rounded-xl hover:bg-white transition-all cursor-pointer shadow-sm">
                <Upload size={20} />
                <span className="font-bold tracking-[0.2em] uppercase text-[10px]">Upload Photo</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
