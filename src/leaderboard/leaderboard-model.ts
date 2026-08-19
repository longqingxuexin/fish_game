export interface LeaderboardEntry { score: number; maxLevel: number; updatedAt: number; }

export function toLeaderboardData(score: number, maxLevel: number): LeaderboardEntry {
  return { score: Math.max(0, Math.floor(score)), maxLevel: Math.max(0, Math.floor(maxLevel)), updatedAt: Date.now() };
}
