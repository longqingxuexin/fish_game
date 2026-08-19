import { SaveData, SaveManager } from './save-manager';
import { CloudAdapter } from '../cloud/cloud-mock';

export class SyncManager {
  constructor(private readonly local: SaveManager, private readonly cloud: CloudAdapter) {}

  async pullAndMerge(): Promise<SaveData | null> {
    const [local, cloud] = await Promise.all([this.local.load(), this.cloud.loadSave()]);
    if (!local && cloud) return cloud;
    if (!cloud && local) { await this.cloud.saveGame(local); return local; }
    if (!local || !cloud) return null;
    const chosen = cloud.savedAt >= local.savedAt ? cloud : local;
    if (chosen === local) await this.cloud.saveGame(local);
    return chosen;
  }

  async push(save: SaveData): Promise<SaveData> {
    const local = await this.local.save(save);
    await this.cloud.saveGame(local);
    return local;
  }
}
