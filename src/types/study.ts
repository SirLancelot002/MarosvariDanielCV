export interface StudyContentBlock {
  type: 'paragraph' | 'image';
  text?: string;      // used when type === 'paragraph'
  src?: string;        // used when type === 'image', relative to public/
  alt?: string;
  caption?: string;
}

export interface StudyTranslation {
  title: string;
  shortDescription: string;
  longDescription: StudyContentBlock[];
}

export interface Study {
  id: string;          // used in the URL: /studies/:id
  level: number;        // 1-5
  translations: {
    en: StudyTranslation;
    hu: StudyTranslation;
  };
}