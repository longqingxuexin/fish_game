export interface StorageAdapter {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
}

export const browserStorage: StorageAdapter = {
  async get<T>(key: string) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : null;
  },
  async set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export function createWechatStorage(wxApi: any): StorageAdapter {
  return {
    get<T>(key: string) {
      return new Promise(resolve => wxApi.getStorage({key, success: (r: any) => resolve((r && r.data) || null), fail: () => resolve(null)}));
    },
    set<T>(key: string, value: T) {
      return new Promise((resolve, reject) => wxApi.setStorage({key, data: value, success: resolve, fail: reject}));
    }
  };
}
