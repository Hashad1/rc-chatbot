import { EventEmitter } from '../utils/EventEmitter';

export class VoiceStream extends EventEmitter {
  private mediaRecorder: MediaRecorder | null = null;
  private audioContext: AudioContext | null = null;
  private stream: MediaStream | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;
  private animationFrame: number | null = null;

  async requestPermissions(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      return false;
    }
  }

  async startStream(): Promise<void> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        throw new Error('Microphone permission denied');
      }

      this.stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      this.audioContext = new AudioContext();
      const source = this.audioContext.createMediaStreamSource(this.stream);
      
      // Create analyser for audio visualization
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      source.connect(this.analyser);
      
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.mediaRecorder.ondataavailable = this.handleAudioData.bind(this);
      this.mediaRecorder.start(100);

      this.startVisualization();
      this.emit('started');
    } catch (error) {
      this.emit('error', error);
      throw error;
    }
  }

  stopStream(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }

    if (this.mediaRecorder?.state === 'recording') {
      this.mediaRecorder.stop();
    }

    this.stream?.getTracks().forEach(track => track.stop());
    this.audioContext?.close();
    
    this.stream = null;
    this.audioContext = null;
    this.mediaRecorder = null;
    this.analyser = null;
    this.dataArray = null;

    this.emit('stopped');
  }

  private startVisualization(): void {
    const analyze = () => {
      if (!this.analyser || !this.dataArray) return;
      
      this.analyser.getByteFrequencyData(this.dataArray);
      const average = this.dataArray.reduce((a, b) => a + b) / this.dataArray.length;
      const amplitude = average / 255; // Normalize to 0-1
      
      this.emit('amplitude', amplitude);
      this.animationFrame = requestAnimationFrame(analyze);
    };

    this.animationFrame = requestAnimationFrame(analyze);
  }

  private handleAudioData(event: BlobEvent): void {
    if (event.data.size > 0) {
      this.emit('data', event.data);
    }
  }
}