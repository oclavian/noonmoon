import React, { useEffect, useRef } from 'react';

interface WelcomeVoicePlayerProps {
  shouldPlay: boolean;
}

export const WelcomeVoicePlayer: React.FC<WelcomeVoicePlayerProps> = ({ shouldPlay }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasTriggeredRef = useRef<boolean>(false);

  useEffect(() => {
    // Only attempt to play once per page lifecycle when preloader finishes
    if (!shouldPlay || hasTriggeredRef.current) {
      return;
    }

    hasTriggeredRef.current = true;

    const audio = new Audio('/welcome-voice.mp3');
    audioRef.current = audio;
    audio.preload = 'auto';

    const attemptPlay = () => {
      audio
        .play()
        .catch(() => {
          // If browser autoplay policy blocks unprompted audio,
          // play automatically on the user's first tap/interaction on the page
          const onFirstInteraction = () => {
            audio.play().catch(() => {});
            window.removeEventListener('pointerdown', onFirstInteraction);
            window.removeEventListener('keydown', onFirstInteraction);
          };

          window.addEventListener('pointerdown', onFirstInteraction, { once: true });
          window.addEventListener('keydown', onFirstInteraction, { once: true });
        });
    };

    // Small delay (350ms) after preloader finishes for smooth audio initiation
    const startTimeout = setTimeout(() => {
      attemptPlay();
    }, 350);

    return () => {
      clearTimeout(startTimeout);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [shouldPlay]);

  // Purely headless audio player: plays seamlessly in the background without any visible widget
  return null;
};

