import engFlag from '../assets/EngFlag.png';
import hunFlag from '../assets/HunFlag.png';

export interface LanguageOption {
  code: string;
  label: string;
  flag: string;
}

// Add new supported languages here (plus the matching i18next resource and locale file).
export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'ENG', flag: engFlag },
  { code: 'hu', label: 'HUN', flag: hunFlag }
];
