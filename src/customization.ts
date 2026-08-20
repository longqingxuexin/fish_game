import { AssetFrame, asset } from './asset';
export type CustomAsset = { type: string; frames: AssetFrame[]; speed?: number; durationMin?: number; durationMax?: number; maxDimension?: number };
export type CustomState = { assets: CustomAsset[] };
const KEY = 'fish_custom_assets_v1';
export const CUSTOM_TYPES = [
  ['player', '自定义主角鱼'], ['small', '自定义小鱼'], ['big', '自定义大鱼'], ['boss', '自定义 Boss 鱼'], ['background', '自定义背景图'],
  ['global_eat', '全屏吞噬特效'], ['type_eat', '同类吞噬特效'], ['speed_up', '极速冲刺特效'], ['grow', '巨型成长特效'], ['heal', '生命恢复特效'], ['invincible', '无敌护盾特效']
] as const;
export const loadCustom = (): CustomState => { try { return JSON.parse(localStorage.getItem(KEY) || '{"assets":[]}'); } catch { return { assets: [] }; } };
export const saveCustom = (state: CustomState) => localStorage.setItem(KEY, JSON.stringify(state));
export const getCustom = (type: string) => loadCustom().assets.find(a => a.type === type);
export async function addFiles(type: string, files: FileList | File[], maxDimension = getCustom(type)?.maxDimension ?? 512): Promise<CustomAsset> {
  if (typeof window !== 'undefined' && !getCustom(type)?.maxDimension) {
    const requested = Number(window.prompt('请输入图片最长边尺寸（128-768，越小越省空间）', String(maxDimension)));
    if (Number.isFinite(requested)) maxDimension = Math.max(128, Math.min(768, requested));
  }
  const previous = getCustom(type);
  const frames = type === 'background'
    ? await Promise.all(Array.from(files).map(async file => ({ dataUrl: await fileToDataUrl(file), name: file.name })))
    : await Promise.all(Array.from(files).map(file => asset(file, { maxDimension })));
  const result = { type, frames, speed: previous?.speed, durationMin: previous?.durationMin, durationMax: previous?.durationMax, maxDimension };
  const state = loadCustom(); state.assets = [...state.assets.filter(a => a.type !== type), result]; saveCustom(state); return result;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error || new Error('读取背景图片失败'));
    reader.readAsDataURL(file);
  });
}
export function removeCustom(type: string) { const state = loadCustom(); state.assets = state.assets.filter(a => a.type !== type); saveCustom(state); }
