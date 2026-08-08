export interface ProjectContentBlock {
  type: 'heading' | 'paragraph' | 'image' | 'link';
  text?: string;      // heading, paragraph, link
  level?: 2 | 3 | 4;   // heading only
  src?: string;         // image only, relative to public/
  alt?: string;         // image only
  caption?: string;     // image only
  url?: string;         // link only
}

export interface ProjectTranslation {
  title: string;
  role?: string;              // nullable — solo projects omit this
  shortDescription: string;
  content: ProjectContentBlock[];
}

export interface Project {
  id: string;
  level: number;               // 1+, rendered with at least 5 dots
  headerSrc?: string;           // nullable
  startDate: string;             // ISO string, same reasoning as Study
  endDate?: string;               // omit if ongoing
  translations: {
    en: ProjectTranslation;
    hu: ProjectTranslation;
  };
}