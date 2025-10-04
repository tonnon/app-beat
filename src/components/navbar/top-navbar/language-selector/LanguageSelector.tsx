import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './language-selector.scss';
import spainFlag from '@/assets/img/spain.svg';
import cataloniaFlag from '@/assets/img/catalonia.png';
import Dropdown from '@/components/dropdown/Dropdown';

export type Language = 'ES' | 'CA';

export interface LanguageSelectorProps {
  onLanguageChange?: (language: Language) => void;
}

const LANGUAGES = [
  { code: 'ES' as const, i18nCode: 'es', name: 'Español', flag: spainFlag },
  { code: 'CA' as const, i18nCode: 'ca', name: 'Català', flag: cataloniaFlag },
] as const;

export default function LanguageSelector({
  onLanguageChange,
}: LanguageSelectorProps) {
  const { i18n } = useTranslation('navbar');
  
  const selectedLanguage = (i18n.language.toUpperCase() as Language);

  const handleLanguageChange = useCallback((language: Language) => {
    const i18nLanguage = language.toLowerCase();
    i18n.changeLanguage(i18nLanguage);
    onLanguageChange?.(language);
  }, [i18n, onLanguageChange]);

  const availableLanguages = useMemo(
    () => LANGUAGES.filter(lang => lang.code !== selectedLanguage),
    [selectedLanguage]
  );

  const dropdownItems = useMemo(
    () =>
      availableLanguages.map((language) => ({
        id: language.code,
        className: 'language-selector-item',
        onSelect: () => handleLanguageChange(language.code),
        content: (
          <>
            <img
              src={language.flag}
              alt={`${language.name} flag`}
              className="language-selector-flag"
              width="24"
              height="24"
            />
            <span className="language-selector-code-single">{language.code}</span>
          </>
        ),
      })),
    [availableLanguages, handleLanguageChange],
  );

  return (
    <Dropdown
      trigger={
        <button className="language-selector-trigger" type="button">
          {selectedLanguage}
        </button>
      }
      items={dropdownItems}
      contentClassName="language-selector-content"
      useDefaultContentStyles={false}
      arrow
      sideOffset={5}
      align="end"
    />
  );
}
