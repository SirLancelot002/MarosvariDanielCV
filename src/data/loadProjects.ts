import type { Project } from '../types/project';

const modules = import.meta.glob('./projects/*.json', { eager: true });

// Projects without an endDate are still ongoing, so they sort first.
const getEndTime = (project: Project) =>
  project.endDate ? new Date(project.endDate).getTime() : Infinity;

export const projects: Project[] = Object.values(modules)
  .map((mod) => (mod as { default: Project }).default)
  .sort((a, b) => getEndTime(b) - getEndTime(a));