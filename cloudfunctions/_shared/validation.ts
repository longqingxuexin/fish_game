export function validateSave(input: any) {
  if (!input || input.schemaVersion !== 1) throw new Error('unsupported schema');
  if (!Number.isFinite(input.score) || input.score < 0 || input.score > 100000000) throw new Error('invalid score');
  if (!Number.isFinite(input.coins) || input.coins < 0 || input.coins > 10000000) throw new Error('invalid coins');
  if (!Number.isFinite(input.size) || input.size < 1 || input.size > 100) throw new Error('invalid size');
  if (!Number.isFinite(input.health) || input.health < 0 || input.health > 3) throw new Error('invalid health');
  return input;
}

export function userId(event: any) {
  const id = event?.userInfo?.openId;
  if (!id) throw new Error('unauthenticated');
  return id;
}
