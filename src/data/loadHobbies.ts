import type { Hobby } from '../types/hobby';

const modules = import.meta.glob('./hobbies/*.json', { eager: true });

export const hobbies: Hobby[] = Object.values(modules)
  .map((mod) => (mod as { default: Hobby }).default)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
