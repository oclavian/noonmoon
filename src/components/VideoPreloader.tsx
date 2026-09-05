import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, SkipForward, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface VideoPreloaderProps {
  onComplete: () => void;
}

export const VideoPreloader: React.FC<VideoPreloaderProps> = ({ onComplete }) => {
  const { language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(10);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [needsUserInteraction, setNeedsUserInteraction] = useState<boolean>(false);

  // Attempt autoplay on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try playing with sound first; fallback to muted if browser blocks
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setNeedsUserInteraction(false);
        })
        .catch(() => {
          // Autoplay blocked by browser policy
          setNeedsUserInteraction(true);
          setIsPlaying(false);
        });
    }
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    if (video.duration && !isNaN(video.duration)) {
      setDuration(video.duration);
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleFinish = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 600); // 600ms matching exit animation
  };

  const handleManualPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setIsMuted(false);
    video.play()
      .then(() => {
        setIsPlaying(true);
        setNeedsUserInteraction(false);
      })
      .catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play();
        setIsPlaying(true);
        setNeedsUserInteraction(false);
      });
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          id="noon-moon-video-preloader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-[#021812] text-white flex flex-col items-center justify-center select-none overflow-hidden"
        >
          {/* Subtle Ambient Glow Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#004B3A]/30 via-transparent to-[#00261D]/70 pointer-events-none" />
          <div className="absolute w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          {/* Top Controls Bar */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 z-20 flex items-center justify-between">
            {/* Branding Pill */}
            <div className="flex items-center gap-2 bg-emerald-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-500/30 text-xs font-semibold text-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{language === 'bn' ? 'নুন-মুন পোর্টাল' : 'Noon-Moon Portal'}</span>
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2.5">
              {/* Sound Toggle */}
              <button
                onClick={toggleSound}
                className="flex items-center gap-1.5 bg-emerald-950/80 hover:bg-emerald-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/30 text-xs font-medium text-emerald-100 transition-all active:scale-95"
                title={isMuted ? 'শব্দ চালু করুন' : 'মিউট করুন'}
                aria-label="Toggle Sound"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-300" />
                    <span className="hidden sm:inline">{language === 'bn' ? 'শব্দ চালু করুন' : 'Unmute'}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">{language === 'bn' ? 'শব্দ বন্ধ' : 'Mute'}</span>
                  </>
                )}
              </button>

              {/* Skip Button */}
              <button
                onClick={handleFinish}
                className="flex items-center gap-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-lg active:scale-95 border border-emerald-400/40"
              >
                <span>{language === 'bn' ? 'স্কিপ করুন' : 'Skip'}</span>
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Centered Video Viewport */}
          <div 
            onClick={needsUserInteraction ? handleManualPlay : undefined}
            className="relative z-10 w-full max-w-4xl max-h-[85vh] px-4 flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] border border-emerald-500/20 bg-black/60 flex items-center justify-center">
              <video
                ref={videoRef}
                src="/intro-video.mp4"
                playsInline
                autoPlay
                muted={isMuted}
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleFinish}
                className="w-auto h-auto max-h-[75vh] max-w-full object-contain rounded-2xl sm:rounded-3xl"
              />

              {/* Tap to Play Overlay if Autoplay is restricted by browser */}
              {needsUserInteraction && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-emerald-100 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-500/30">
                    {language === 'bn' ? 'ইন্ট্রো ভিডিও দেখতে ক্লিক করুন' : 'Click to Play Intro'}
                  </span>
                </div>
              )}
            </div>

            {/* Video Title / Status */}
            <div className="mt-4 flex items-center justify-between w-full max-w-2xl px-2 text-xs sm:text-sm text-emerald-200/80 font-medium font-bangla">
              <span>{language === 'bn' ? 'স্বাগতম নুন-মুন প্ল্যাটফর্মে' : 'Welcome to Noon-Moon Platform'}</span>
              <span>
                {Math.floor(currentTime)}s / {Math.ceil(duration)}s
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-2xl mt-2 h-1.5 bg-emerald-950/80 rounded-full overflow-hidden border border-emerald-800/40">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>

          {/* Bottom Hint */}
          <div className="absolute bottom-4 sm:bottom-6 text-center text-xs text-emerald-400/60 font-medium">
            {language === 'bn' ? 'ভিডিওটি সম্পূর্ণ হলে স্বয়ংক্রিয়ভাবে সাইট চালু হবে' : 'Site will load automatically after the intro'}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
