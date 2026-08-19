const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

export async function main(event: any) {
  const openId = event?.userInfo?.openId;
  const record = event?.data;
  if (!openId) throw new Error('unauthenticated');
  if (!record || !Number.isFinite(record.score) || record.score < 0 || record.score > 100000000) throw new Error('invalid score');
  if (!Number.isFinite(record.durationSec) || record.durationSec < 1 || record.durationSec > 86400) throw new Error('invalid duration');
  await db.collection('game_records').add({ data: { ...record, playerId: openId, createdAt: new Date() } });
  return { ok: true };
}
