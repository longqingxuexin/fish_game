import { SaveData } from '../core/save-manager';

export interface CloudAdapter {
  loadSave(): Promise<SaveData | null>;
  saveGame(save: SaveData): Promise<SaveData>;
  submitRecord(record: { score: number; level: number; durationSec: number }): Promise<void>;
}

export class MockCloudAdapter implements CloudAdapter {
  private save: SaveData | null = null;
  private records: Array<{ score: number; level: number; durationSec: number }> = [];

  async loadSave() { return this.save; }
  async saveGame(save: SaveData) { this.save = save; return save; }
  async submitRecord(record: { score: number; level: number; durationSec: number }) {
    if (record.score < 0 || record.durationSec < 0) throw new Error('invalid record');
    this.records.push(record);
  }
}

export function createWechatCloudAdapter(wxApi: any): CloudAdapter {
  const call = (name: string, data?: any) => new Promise<any>((resolve, reject) =>
    wxApi.cloud.callFunction({ name, data, success: (r: any) => resolve(r.result?.data ?? r.result), fail: reject }));
  return {
    loadSave: () => call('loadSave'),
    saveGame: (save) => call('saveGame', save),
    submitRecord: (record) => call('submitRecord', record).then(() => undefined)
  };
}
