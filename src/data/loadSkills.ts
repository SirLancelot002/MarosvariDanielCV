import type { SkillTable } from '../types/skill';

const modules = import.meta.glob('./skills/*.json', { eager: true });

const unsorted: SkillTable[] = Object.values(modules).map(
  (mod) => (mod as { default: SkillTable }).default
);

export const skillTables: SkillTable[] = [...unsorted].sort((a, b) => a.priority - b.priority);