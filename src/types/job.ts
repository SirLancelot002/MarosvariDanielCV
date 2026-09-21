export type JobSeniority = 'junior' | 'medior' | 'senior' | 'manager';

export interface JobContentItem {
  type: 'heading' | 'paragraph' | 'image' | 'link';
  text?: string;
  level?: 2 | 3 | 4;
  src?: string;
  alt?: string;
  caption?: string;
  url?: string;
  weight?: number;
}

export interface JobContentSection {
  items: JobContentItem[];
  isCloseable?: boolean;
  isClosedByDefault?: boolean;
}

export interface JobTranslation {
  title: string;
  employer?: string;
  seniorityLabel: string;   // short label shown next to the emoji, e.g. "Junior"
  shortDescription: string;
  tags?: string[];
  content: JobContentSection[];
}

export interface Job {
  id: string;
  level: number;
  seniority: JobSeniority;
  color?: string;
  headerSrc?: string;
  employerSrc?: string;
  startDate: string;
  endDate?: string;
  lanyardFrontSrc: string;
  lanyardBackSrc: string;
  lanyardBandSrc: string;
  translations: {
    en: JobTranslation;
    hu: JobTranslation;
  };
}