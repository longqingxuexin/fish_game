const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

export async function main(event: any) {
  const openId = event?.userInfo?.openId;
  if (!openId) throw new Error('unauthenticated');
  const result = await db.collection('player_profiles').doc(openId).get().catch(() => ({ data: null }));
  return { ok: true, data: result.data || null };
}
