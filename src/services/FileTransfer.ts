import { EventEmitter } from '../utils/EventEmitter';

export class FileTransfer extends EventEmitter {
  private chunkSize = 1024 * 1024; // 1MB chunks
  private activeTransfers: Map<string, { 
    progress: number,
    paused: boolean,
    hash: string
  }> = new Map();

  async uploadFile(file: File, onProgress: (progress: number) => void): Promise<string> {
    const transferId = crypto.randomUUID();
    const fileHash = await this.calculateHash(file);
    
    this.activeTransfers.set(transferId, {
      progress: 0,
      paused: false,
      hash: fileHash
    });

    try {
      const chunks = this.splitIntoChunks(file);
      let uploadedChunks = 0;

      for (const chunk of chunks) {
        if (this.activeTransfers.get(transferId)?.paused) {
          await this.waitForResume(transferId);
        }

        await this.uploadChunk(chunk, transferId);
        uploadedChunks++;
        
        const progress = (uploadedChunks / chunks.length) * 100;
        onProgress(progress);
        
        this.activeTransfers.get(transferId)!.progress = progress;
      }

      return transferId;
    } catch (error) {
      this.emit('error', { transferId, error });
      throw error;
    }
  }

  pauseTransfer(transferId: string): void {
    const transfer = this.activeTransfers.get(transferId);
    if (transfer) {
      transfer.paused = true;
    }
  }

  resumeTransfer(transferId: string): void {
    const transfer = this.activeTransfers.get(transferId);
    if (transfer) {
      transfer.paused = false;
      this.emit('resume', transferId);
    }
  }

  private async calculateHash(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  private splitIntoChunks(file: File): Blob[] {
    const chunks: Blob[] = [];
    for (let i = 0; i < file.size; i += this.chunkSize) {
      chunks.push(file.slice(i, i + this.chunkSize));
    }
    return chunks;
  }

  private async uploadChunk(chunk: Blob, transferId: string): Promise<void> {
    // Implement actual chunk upload logic here
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulated upload
  }

  private waitForResume(transferId: string): Promise<void> {
    return new Promise(resolve => {
      const handler = (id: string) => {
        if (id === transferId) {
          this.off('resume', handler);
          resolve();
        }
      };
      this.on('resume', handler);
    });
  }
}