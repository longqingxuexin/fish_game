const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

function validate(input: any) {
  if (!input || input.schemaVersion !== 1) throw new Error('unsupported schema');
  if (!Number.isFinite(input.score) || input.score < 0 || input.score > 100000000) throw new Error('invalid score');
  if (!Number.isFinite(input.coins) || input.coins < 0 || input.coins > 10000000) throw new Error('invalid coins');
  if (!Number.isFinite(input.size) || input.size < 1 || input.size > 100) throw new Error('invalid size');
  if (!Number.isFinite(input.health) || input.health < 0 || input.health > 3) throw new Error('invalid health');
  return input;
}

export async function main(event: any) {
  const openId = event?.userInfo?.openId;
  if (!openId) throw new Error('unauthenticated');
  const data = validate(event.data);
  const saved = { ...data, _id: openId, updatedAt: new Date() };
  await db.collection('player_profiles').doc(openId).set({ data: saved });
  return { ok: true, data: saved };
}
