import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale, pathname } = router;

  const menuItems = [
    { href: '/', label: 'menu.home' },
    { href: '/articles', label: 'menu.articles' },
    { href: '/chat', label: 'menu.psyAI' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contacts', label: 'menu.contact' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'sr', name: 'Српски' },
  ];

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest('.language-dropdown')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  const handleLanguageChange = (newLocale: string) => {
    const { asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isCurrentPage = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-r from-primary-600 to-primary-800 shadow-xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <a 
                href="/" 
                className={`text-2xl font-bold tracking-wide transition duration-300 cursor-pointer text-white hover:text-primary-200`}
              >
                {t('menu.portalName')}
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`transition duration-300 font-medium cursor-pointer ${
                    isCurrentPage(item.href) 
                      ? 'text-primary-200 border-b-2 border-primary-200' 
                      : 'text-white hover:text-primary-200'
                  }`}
                >
                  {t(item.label)}
                </a>
              ))}
              <div className="relative group language-dropdown">
                <button 
                  className={`transition duration-300 font-medium flex items-center cursor-pointer text-white hover:text-primary-200`}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {languages.find(lang => lang.code === locale)?.name}
                  <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 transform transition-all duration-200 ${
                  isMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                } z-50`}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        handleLanguageChange(lang.code);
                        setIsMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm cursor-pointer transition-colors duration-200 ${
                        locale === lang.code ? 'bg-primary-100 text-primary-800' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`transition duration-300 cursor-pointer text-white hover:text-primary-200`}
              >
                <svg className={`h-6 w-6 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-primary-600 to-primary-800 shadow-lg border-b border-gray-200">
          <div className="px-4 pt-4 pb-4 space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`block px-4 py-3 rounded-lg transition duration-300 font-medium cursor-pointer ${
                  isCurrentPage(item.href)
                    ? 'bg-primary-100 text-primary-800'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {t(item.label)}
              </a>
            ))}
            <div className="border-t border-gray-200 mt-2 pt-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    handleLanguageChange(lang.code);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition duration-300 font-medium cursor-pointer ${
                    locale === lang.code 
                      ? 'bg-primary-100 text-primary-800' 
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};