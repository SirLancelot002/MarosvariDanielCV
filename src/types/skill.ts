export interface SkillRowTranslation {
  name: string;
  comment?: string;
}

export interface SkillRow {
  icon?: string;        // relative to public/
  rating: number;         // 0-5
  links?: string[];         // raw strings, e.g. "project:best-fps", "table:tools-platforms"
  translations: {
    en: SkillRowTranslation;
    hu: SkillRowTranslation;
  };
}

export interface SkillTableTranslation {
  title: string;
}

export interface SkillTable {
  id: string;
  priority: number;   // lower = shown first
  icon?: string;
  translations: {
    en: SkillTableTranslation;
    hu: SkillTableTranslation;
  };
  skills: SkillRow[];
}