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
  isCloseable?: boolean;       // if true, shows a ">" toggle on the section's first heading
  isClosedByDefault?: boolean; // only relevant when isCloseable is true
}

export interface JobTranslation {
  title: string;
  role?: string;
  shortDescription: string;
  tags?: string[];
  content: JobContentSection[];
}

export interface Job {
  id: string;
  level: number;
  color?: string;
  headerSrc?: string;
  startDate: string;
  endDate?: string;
  lanyardFrontSrc: string;   // relative to public/, e.g. "jobs/mycompany/front.png"
  lanyardBackSrc: string;
  lanyardBandSrc: string;
  translations: {
    en: JobTranslation;
    hu: JobTranslation;
  };
}