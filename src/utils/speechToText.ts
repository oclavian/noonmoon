// Web Speech API Voice Typing Helper for Bengali (bn-BD)

export interface VoiceRecognitionOptions {
  lang?: string;
  continuous?: boolean;
  interimResults?: boolean;
  onResult: (transcript: string, isFinal: boolean) => void;
  onError: (error: string) => void;
  onEnd: () => void;
  onStart: () => void;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}

export class BanglaSpeechRecognizer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private recognition: any = null;
  private isListening = false;

  constructor(private options: VoiceRecognitionOptions) {
    if (isSpeechRecognitionSupported()) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.lang = options.lang || 'bn-BD';
      this.recognition.continuous = options.continuous ?? true;
      this.recognition.interimResults = options.interimResults ?? true;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalTranscript += item[0].transcript;
          } else {
            interimTranscript += item[0].transcript;
          }
        }

        if (finalTranscript) {
          this.options.onResult(finalTranscript, true);
        } else if (interimTranscript) {
          this.options.onResult(interimTranscript, false);
        }
      };

      this.recognition.onstart = () => {
        this.isListening = true;
        this.options.onStart();
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.options.onEnd();
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        let errorMessage = 'ভয়েস শনাক্তকরণে সমস্যা হয়েছে';
        if (event.error === 'not-allowed') {
          errorMessage = 'মাইক্রোফোন ব্যবহারের অনুমতি পাওয়া যায়নি। ব্রাউজার সেটিংসে অনুমতি দিন।';
        } else if (event.error === 'no-speech') {
          errorMessage = 'কোনো কথা শনাক্ত করা যায়নি। পুনরায় চেষ্টা করুন।';
        } else if (event.error === 'network') {
          errorMessage = 'ইন্টারনেট সংযোগ চেক করুন।';
        }
        this.options.onError(errorMessage);
      };
    }
  }

  public start(): boolean {
    if (!this.recognition) {
      this.options.onError('আপনার ব্রাউজারে ভয়েস টাইপিং সুবিধা সমর্থিত নয়। দয়া করে Chrome বা Edge ব্রাউজার ব্যবহার করুন।');
      return false;
    }
    if (this.isListening) return true;

    try {
      this.recognition.start();
      return true;
    } catch {
      this.options.onError('ভয়েস রিকগনিশন শুরু করা যায়নি।');
      return false;
    }
  }

  public stop(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {
        // ignore
      }
      this.isListening = false;
    }
  }

  public getActive(): boolean {
    return this.isListening;
  }
}
