export interface StudyContentBlock {
  type: 'paragraph' | 'image';
  text?: string;
  src?: string;
  alt?: string;
  caption?: string;
}

export interface StudyTranslation {
  title: string;
  facility?: string;
  shortDescription: string;
  longDescription: StudyContentBlock[];
}

export interface Study {
  id: string;
  level: number;
  institutionSrc?: string;
  headerSrc?: string;   // relative to public/, e.g. "studies/bme-header.jpg"
  startDate: string;     // ISO date string, e.g. "2021-09-01"
  endDate?: string;      // ISO date string, or omitted/undefined if still ongoing
  translations: {
    en: StudyTranslation;
    hu: StudyTranslation;
  };
}