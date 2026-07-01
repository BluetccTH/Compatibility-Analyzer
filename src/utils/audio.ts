// @ts-ignore
import musicUrl from "../assets/audio/จักรวาลไหน (feat. MONICA).mp3";

/**
 * CuteAudioPlayer manages playing the uploaded song "จักรวาลไหน (feat. MONICA)" 
 * using an HTML5 Audio element, with a graceful fallback to a Web Audio API 
 * pop synthesizer if the audio file fails or is missing.
 */

class CuteSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: any = null;
  private currentNoteIndex: number = 0;
  private tempo: number = 110; // BPM
  private volumeNode: GainNode | null = null;
  private volume: number = 0.12;

  // A sweet pop-styled melodic phrase inspired by the chorus of "จักรวาลไหน (feat. MONICA)"
  private melody: Array<[number, number, number]> = [
    [659.25, 1, 0.9], // E5
    [587.33, 1, 0.7], // D5
    [523.25, 1.5, 0.8], // C5
    [392.00, 1.5, 0.6], // G4
    [0, 1, 0], // rest

    [440.00, 1, 0.7], // A4
    [523.25, 1, 0.8], // C5
    [659.25, 1, 0.9], // E5
    [587.33, 2.5, 0.9], // D5
    [0, 1, 0], // rest

    [698.46, 1, 0.9], // F5
    [659.25, 1, 0.8], // E5
    [587.33, 1.5, 0.8], // D5
    [523.25, 1.5, 0.7], // C5
    [0, 1, 0], // rest

    [587.33, 1, 0.8], // D5
    [523.25, 1, 0.8], // C5
    [392.00, 1, 0.6], // G4
    [440.00, 1, 0.7], // A4
    [523.25, 3, 0.9], // C5
    [0, 2, 0], // rest
  ];

  private chords: Array<number[]> = [
    [130.81, 261.63, 329.63], // C major pad
    [98.00, 196.00, 293.66],  // G major pad
    [110.00, 220.00, 261.63], // A minor pad
    [87.31, 174.61, 220.00],  // F major pad
  ];

  constructor() {}

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.volumeNode = this.ctx.createGain();
      this.volumeNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.volumeNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public setVolume(volume: number) {
    this.volume = volume;
    if (this.volumeNode && this.ctx) {
      const clamped = Math.max(0, Math.min(0.3, volume));
      this.volumeNode.gain.linearRampToValueAtTime(clamped, this.ctx.currentTime + 0.1);
    }
  }

  public start() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;
    this.currentNoteIndex = 0;
    this.playLoop();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  private playLoop = () => {
    if (!this.isPlaying || !this.ctx || !this.volumeNode) return;

    const beatDuration = 60 / this.tempo;
    const now = this.ctx.currentTime;
    const [freq, duration, velocity] = this.melody[this.currentNoteIndex];
    
    if (freq > 0) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.25 * velocity, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + beatDuration * duration - 0.05);
      
      osc.connect(gain);
      gain.connect(this.volumeNode);
      
      osc.start(now);
      osc.stop(now + beatDuration * duration);
    }

    if (this.currentNoteIndex % 4 === 0) {
      const chordIndex = Math.floor(this.currentNoteIndex / 4) % this.chords.length;
      const activeChord = this.chords[chordIndex];

      activeChord.forEach((chordFreq) => {
        const chordOsc = this.ctx!.createOscillator();
        const chordGain = this.ctx!.createGain();

        chordOsc.type = "triangle";
        chordOsc.frequency.setValueAtTime(chordFreq * 1.5, now);

        chordGain.gain.setValueAtTime(0, now);
        chordGain.gain.linearRampToValueAtTime(0.04, now + 0.5);
        chordGain.gain.exponentialRampToValueAtTime(0.001, now + beatDuration * 4 - 0.1);

        chordOsc.connect(chordGain);
        chordGain.connect(this.volumeNode!);

        chordOsc.start(now);
        chordOsc.stop(now + beatDuration * 4);
      });
    }

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;
    this.timerId = setTimeout(this.playLoop, beatDuration * duration * 1000);
  };
}

class CuteAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private synthesizer: CuteSynthesizer;
  private useSynthesizer: boolean = false;
  private isPlaying: boolean = false;
  private volume: number = 0.12;
  private listeners: Array<(playing: boolean) => void> = [];

  constructor() {
    this.synthesizer = new CuteSynthesizer();
    if (typeof window !== "undefined") {
      this.audio = new Audio(musicUrl);
      this.audio.loop = true;
      this.audio.volume = this.volume;
      this.audio.preload = "auto";
      
      this.audio.addEventListener("error", (e) => {
        console.warn("Audio element error event:", e, "Error detail:", this.audio?.error);
        this.useSynthesizer = true;
        if (this.isPlaying) {
          this.synthesizer.start();
        }
      });
    }
  }

  public subscribe(listener: (playing: boolean) => void) {
    this.listeners.push(listener);
    listener(this.isPlaying);
  }

  public unsubscribe(listener: (playing: boolean) => void) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  private notify(playing: boolean) {
    this.listeners.forEach(l => l(playing));
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.isPlaying = true;
    this.notify(true);

    if (this.audio) {
      this.audio.play()
        .then(() => {
          this.useSynthesizer = false;
          this.synthesizer.stop();
        })
        .catch((err) => {
          console.warn("Audio play error:", err);
          console.warn("Playing fallback synthesizer.");
          if (this.isPlaying) {
            this.synthesizer.start();
          }
        });
    } else {
      this.synthesizer.start();
    }
  }

  public stop() {
    this.isPlaying = false;
    this.notify(false);
    if (this.audio) {
      this.audio.pause();
    }
    this.synthesizer.stop();
  }

  public setVolume(volume: number) {
    this.volume = volume;
    if (this.audio) {
      this.audio.volume = volume;
    }
    this.synthesizer.setVolume(volume);
  }

  public getPlayingStatus(): boolean {
    return this.isPlaying;
  }
}

export const cuteSynth = new CuteAudioPlayer();
