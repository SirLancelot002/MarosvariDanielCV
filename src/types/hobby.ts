import type { JobContentSection } from './job';

export interface HobbyTranslation {
  title: string;
  shortDescription: string;
  tags?: string[];
  content: JobContentSection[];
}

export interface Hobby {
  id: string;
  color?: string;
  bannerSrc: string;
  order?: number;
  translations: {
    en: HobbyTranslation;
    hu: HobbyTranslation;
  };
}
