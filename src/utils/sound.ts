// Web Audio API sound generator for romantic ambient sounds & interactive FX

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgOscillators: OscillatorNode[] = [];
  private bgGain: GainNode | null = null;
  private isBgPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.bgGain && this.ctx) {
      this.bgGain.gain.setValueAtTime(this.isMuted ? 0 : 0.08, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Wax Seal Snap / Pop
  public playSealPop() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  // Paper Rustle / Unfold sound
  public playPaperUnfold() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    filter.Q.value = 1.5;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  // Soft Chime / Bell FX
  public playChime(freq = 523.25) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 1.2);
  }

  // Light Click
  public playClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  // Start Romantic Background Piano Chord Arpeggio Loop
  public startAmbientMusic() {
    if (this.isBgPlaying) return;
    this.initCtx();
    if (!this.ctx) return;

    this.isBgPlaying = true;
    this.bgGain = this.ctx.createGain();
    this.bgGain.gain.setValueAtTime(this.isMuted ? 0 : 0.06, this.ctx.currentTime);
    this.bgGain.connect(this.ctx.destination);

    // Soft pentatonic chord progression (Fmaj7, Cmaj7, Am7, G6)
    const notes = [
      [349.23, 440.00, 523.25, 659.25], // Fmaj7
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [196.00, 246.94, 293.66, 392.00], // G6
    ];

    let chordIdx = 0;
    const playChordCycle = () => {
      if (!this.isBgPlaying || !this.ctx) return;

      const currentChord = notes[chordIdx];
      chordIdx = (chordIdx + 1) % notes.length;

      currentChord.forEach((freq, noteIdx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + noteIdx * 0.35);

        noteGain.gain.setValueAtTime(0.001, this.ctx.currentTime + noteIdx * 0.35);
        noteGain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + noteIdx * 0.35 + 0.4);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + noteIdx * 0.35 + 3.8);

        osc.connect(noteGain);
        if (this.bgGain) noteGain.connect(this.bgGain);

        osc.start(this.ctx.currentTime + noteIdx * 0.35);
        osc.stop(this.ctx.currentTime + noteIdx * 0.35 + 4.0);
      });

      setTimeout(playChordCycle, 3800);
    };

    playChordCycle();
  }

  public stopAmbientMusic() {
    this.isBgPlaying = false;
  }
}

export const soundFx = new SoundManager();
