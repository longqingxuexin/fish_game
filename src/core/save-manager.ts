import { browserStorage, StorageAdapter } from '../platform/storage';

export interface SaveData {
  schemaVersion: number;
  score: number;
  size: number;
  maxScore: number;
  health: number;
  coins: number;
  savedAt: number;
  checksum: string;
}

export class SaveManager {
  constructor(private readonly storage: StorageAdapter = browserStorage) {}

  private checksum(data: Omit<SaveData, 'checksum'>): string {
    return btoa(JSON.stringify(data)).slice(0, 24);
  }

  async save(input: Omit<SaveData, 'schemaVersion' | 'checksum'>): Promise<SaveData> {
    const base = { schemaVersion: 1, ...input };
    const data = { ...base, checksum: this.checksum(base) };
    await this.storage.set('fish_save_current', data);
    await this.storage.set('fish_save_backup', data);
    return data;
  }

  async load(): Promise<SaveData | null> {
    const current = await this.storage.get<SaveData>('fish_save_current');
    const backup = await this.storage.get<SaveData>('fish_save_backup');
    for (const candidate of [current, backup]) {
      if (!candidate || candidate.schemaVersion !== 1) continue;
      const { checksum, ...base } = candidate;
      if (this.checksum(base) === checksum) return candidate;
    }
    return null;
  }
}
