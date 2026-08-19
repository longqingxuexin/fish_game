import { AssetFrame, asset } from './asset';
export type CustomAsset = { type: string; frames: AssetFrame[]; speed?: number; durationMin?: number; durationMax?: number };
export type CustomState = { assets: CustomAsset[] };
const KEY = 'fish_custom_assets_v1';
export const CUSTOM_TYPES = [
  ['player', '自定义主角鱼'], ['small', '自定义小鱼'], ['big', '自定义大鱼'], ['boss', '自定义 Boss 鱼'], ['background', '自定义背景图'],
  ['global_eat', '全屏吞噬特效'], ['type_eat', '同类吞噬特效'], ['speed_up', '极速冲刺特效'], ['grow', '巨型成长特效'], ['heal', '生命恢复特效'], ['invincible', '无敌护盾特效']
] as const;
export const loadCustom = (): CustomState => { try { return JSON.parse(localStorage.getItem(KEY) || '{"assets":[]}'); } catch { return { assets: [] }; } };
export const saveCustom = (state: CustomState) => localStorage.setItem(KEY, JSON.stringify(state));
export const getCustom = (type: string) => loadCustom().assets.find(a => a.type === type);
export async function addFiles(type: string, files: FileList | File[]): Promise<CustomAsset> {
  const frames = await Promise.all(Array.from(files).map(asset)), previous = getCustom(type);
  const result = { type, frames, speed: previous?.speed, durationMin: previous?.durationMin, durationMax: previous?.durationMax };
  const state = loadCustom(); state.assets = [...state.assets.filter(a => a.type !== type), result]; saveCustom(state); return result;
}
export function removeCustom(type: string) { const state = loadCustom(); state.assets = state.assets.filter(a => a.type !== type); saveCustom(state); }
