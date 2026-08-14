export interface ContentItem {
  type: 'heading' | 'paragraph' | 'image' | 'link';
  text?: string;      // heading, paragraph, link
  level?: 2 | 3 | 4;   // heading only
  src?: string;         // image only, relative to public/
  alt?: string;         // image only
  caption?: string;     // image only
  url?: string;         // link only
  weight?: number;   // Bootstrap column weight, 1-12. Defaults to 12 (full width) if omitted.
}

export interface ContentSection {
  items: ContentItem[];
}

export interface ProjectTranslation {
  title: string;
  role?: string;
  shortDescription: string;
  tags?: string[];
  content: ContentSection[];
}

export interface Project {
  id: string;
  level: number;
  color?: string;
  headerSrc?: string;
  startDate: string;
  endDate?: string;
  translations: {
    en: ProjectTranslation;
    hu: ProjectTranslation;
  };
}