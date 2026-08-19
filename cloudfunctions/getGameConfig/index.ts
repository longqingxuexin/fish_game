const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

export async function main() {
  const result = await db.collection('game_config').doc('default').get().catch(() => ({ data: null }));
  return { ok: true, data: result.data || { skillIntervalSec: 120 } };
}
