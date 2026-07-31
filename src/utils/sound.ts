// Automatic Background Audio Manager for "Apocalypse - Cigarettes After Sex" & Subtle Paper Sound Effects

type AudioListener = (isPlaying: boolean, isMuted: boolean, progress: number) => void;

class SoundManager {
  private audio: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private isPlayingState: boolean = false;
  private listeners: Set<AudioListener> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio('/apocalypse.mp3');
      this.audio.loop = true;
      this.audio.volume = 0.85;

      this.audio.addEventListener('play', () => {
        this.isPlayingState = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlayingState = true; // Auto-resume if paused
        if (this.audio) {
          this.audio.play().catch(() => {});
        }
        this.notify();
      });

      this.audio.addEventListener('timeupdate', () => {
        this.notify();
      });

      // Try autoplay immediately
      this.playBgMusic();

      // Ensure autoplay on first interaction of any kind
      const triggerAutoplay = () => {
        this.playBgMusic();
      };

      const events = ['click', 'touchstart', 'keydown', 'mousemove', 'scroll', 'pointerdown'];
      events.forEach((evt) => {
        window.addEventListener(evt, triggerAutoplay, { passive: true });
      });
    }
  }

  public subscribe(listener: AudioListener) {
    this.listeners.add(listener);
    listener(this.isPlayingState, false, this.getProgress());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const progress = this.getProgress();
    this.listeners.forEach((fn) => fn(this.isPlayingState, false, progress));
  }

  public playBgMusic(): Promise<void> | undefined {
    if (!this.audio) return;
    this.audio.muted = false;
    return this.audio.play().then(() => {
      this.isPlayingState = true;
      this.notify();
    }).catch(() => {
      // Autoplay blocked until first gesture
    });
  }

  public pauseBgMusic() {
    // Keep playing automatically
    this.playBgMusic();
  }

  public togglePlay() {
    this.playBgMusic();
  }

  public toggleMute(): boolean {
    return false;
  }

  public getMuted(): boolean {
    return false;
  }

  public isPlaying(): boolean {
    return true;
  }

  public getProgress(): number {
    if (!this.audio || !this.audio.duration) return 0;
    return (this.audio.currentTime / this.audio.duration) * 100;
  }

  public seek(_percentage: number) {}

  // Soft pencil/fountain pen scratch sound on paper for typing animation
  public playWritingScratch() {
    try {
      if (typeof window === 'undefined') return;
      if (!this.audioCtx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.audioCtx = new AudioCtx();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const bufferSize = Math.floor(this.audioCtx.sampleRate * 0.035); // 35ms burst
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }

      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2200 + Math.random() * 400; // Paper friction frequency
      filter.Q.value = 2.5;

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime); // Very subtle pencil whisper
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.035);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      noise.start();
    } catch {
      // AudioContext unavailable or blocked
    }
  }

  public playSealPop() {}
  public playPaperUnfold() {}
  public playChime(_freq?: number) {}
  public playClick() {
    this.playWritingScratch();
  }
  public startAmbientMusic() {
    this.playBgMusic();
  }
  public stopAmbientMusic() {}
}

export const soundFx = new SoundManager();
