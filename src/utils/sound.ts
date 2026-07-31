// Automatic Background Audio Manager for "Apocalypse - Cigarettes After Sex"

type AudioListener = (isPlaying: boolean, isMuted: boolean, progress: number) => void;

class SoundManager {
  private audio: HTMLAudioElement | null = null;
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

  public playSealPop() {}
  public playPaperUnfold() {}
  public playChime(_freq?: number) {}
  public playClick() {}
  public startAmbientMusic() {
    this.playBgMusic();
  }
  public stopAmbientMusic() {}
}

export const soundFx = new SoundManager();
