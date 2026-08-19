export type SkillType='global_eat'|'type_eat'|'speed_up'|'grow'|'heal'|'invincible';
export const SKILL_INTERVAL_SEC = 120;
export const TEST_SKILL_INTERVAL_SEC = 5;

export function nextSkillAt(now: number, testMode = false): number {
  return now + (testMode ? TEST_SKILL_INTERVAL_SEC : SKILL_INTERVAL_SEC) * 1000;
}

export function randomSkill(random = Math.random): SkillType {
  const all: SkillType[] = ['global_eat','type_eat','speed_up','grow','heal','invincible'];
  return all[Math.floor(random() * all.length)];
}

export function isValidSkill(skill: string): skill is SkillType {
  return ['global_eat','type_eat','speed_up','grow','heal','invincible'].includes(skill);
}
