// Real Background Audio Manager for "Apocalypse - Cigarettes After Sex"

type AudioListener = (isPlaying: boolean, isMuted: boolean, progress: number) => void;

class SoundManager {
  private audio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private isPlayingState: boolean = false;
  private listeners: Set<AudioListener> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio('/apocalypse.mp3');
      this.audio.loop = true;
      this.audio.volume = 0.8;

      this.audio.addEventListener('play', () => {
        this.isPlayingState = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlayingState = false;
        this.notify();
      });

      this.audio.addEventListener('timeupdate', () => {
        this.notify();
      });

      // Auto-start on first user interaction anywhere on screen
      const handleFirstInteraction = () => {
        if (this.audio && this.audio.paused) {
          this.playBgMusic();
        }
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('touchstart', handleFirstInteraction);
        window.removeEventListener('keydown', handleFirstInteraction);
      };

      window.addEventListener('click', handleFirstInteraction);
      window.addEventListener('touchstart', handleFirstInteraction);
      window.addEventListener('keydown', handleFirstInteraction);
    }
  }

  public subscribe(listener: AudioListener) {
    this.listeners.add(listener);
    // Send current state right away
    listener(this.isPlayingState, this.isMuted, this.getProgress());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const progress = this.getProgress();
    this.listeners.forEach((fn) => fn(this.isPlayingState, this.isMuted, progress));
  }

  public playBgMusic(): Promise<void> | undefined {
    if (!this.audio) return;
    this.audio.muted = this.isMuted;
    return this.audio.play().then(() => {
      this.isPlayingState = true;
      this.notify();
    }).catch((err) => {
      console.log('Audio play waiting for gesture:', err);
    });
  }

  public pauseBgMusic() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlayingState = false;
    this.notify();
  }

  public togglePlay() {
    if (this.isPlayingState) {
      this.pauseBgMusic();
    } else {
      this.playBgMusic();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.audio) {
      this.audio.muted = this.isMuted;
    }
    this.notify();
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public isPlaying(): boolean {
    return this.isPlayingState;
  }

  public getProgress(): number {
    if (!this.audio || !this.audio.duration) return 0;
    return (this.audio.currentTime / this.audio.duration) * 100;
  }

  public seek(percentage: number) {
    if (this.audio && this.audio.duration) {
      this.audio.currentTime = (percentage / 100) * this.audio.duration;
    }
  }

  // Pure no-op functions so all synthetic web-audio beeps & clicks are completely removed
  public playSealPop() {}
  public playPaperUnfold() {}
  public playChime(_freq?: number) {}
  public playClick() {}
  public startAmbientMusic() {
    this.playBgMusic();
  }
  public stopAmbientMusic() {
    this.pauseBgMusic();
  }
}

export const soundFx = new SoundManager();
