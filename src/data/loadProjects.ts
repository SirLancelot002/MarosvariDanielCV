import type { Project } from '../types/project';

const modules = import.meta.glob('./projects/*.json', { eager: true });

export const projects: Project[] = Object.values(modules).map(
  (mod) => (mod as { default: Project }).default
);