import { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logoImage from '@/assets/img/logo.png';
import LanguageSelector from './language-selector/LanguageSelector';
import UserMenu from './user-menu/UserMenu';
import './top-navbar.scss';

export interface TopNavbarProps {
  className?: string;
  scrollThreshold?: number;
}

export default function TopNavbar({
  className,
  scrollThreshold = 10,
}: TopNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation('navbar');

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > scrollThreshold);
  }, [scrollThreshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const componentClassName = useMemo(
    () =>
      [
        'top-navbar',
        isScrolled && 'is-scrolled',
        className,
      ]
        .filter(Boolean)
        .join(' '),
    [isScrolled, className]
  );

  return (
    <nav className={componentClassName} aria-label="Top navigation">
      <div className="top-navbar-container">
        <div className="top-navbar-section top-navbar-logo">
          <Link to="/" className="top-navbar-logo-link">
            <img 
              src={logoImage} 
              alt='Beat App Logo' 
              className="top-navbar-logo-image"
              loading="eager"
              width="auto"
              height="auto"
            />
          </Link>
        </div>

        <div className="top-navbar-section top-navbar-center">
          <Link to="#acerca" className="top-navbar-link">{t('about')}</Link>
          <Link to="#contacto" className="top-navbar-link">{t('contact')}</Link>
          <Link to="#otro" className="top-navbar-link">{t('other')}</Link>
        </div>

        <div className="top-navbar-section top-navbar-right">
          <LanguageSelector />
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}

