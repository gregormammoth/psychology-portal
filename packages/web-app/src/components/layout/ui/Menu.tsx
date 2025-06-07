import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export const Menu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale } = router;

  const menuItems = [
    { href: '/', label: 'menu.home' },
    { href: '/chat', label: 'menu.psyAI' },
    { href: '/articles', label: 'menu.articles' },
    { href: '/contacts', label: 'menu.contact' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'sr', name: 'Српски' },
  ];

  const handleLanguageChange = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-primary-600 to-primary-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-white tracking-wide hover:text-primary-200 transition duration-300">
                {t('menu.portalName')}
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-primary-200 transition duration-300 font-medium"
                >
                  {t(item.label)}
                </a>
              ))}
              <div className="relative group">
                <button 
                  className="text-white hover:text-primary-200 transition duration-300 font-medium flex items-center"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {languages.find(lang => lang.code === locale)?.name}
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 ${isMenuOpen ? 'block' : 'hidden'} z-50`}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        handleLanguageChange(lang.code);
                        setIsMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
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
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-primary-200 transition duration-300"
              >
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-primary-600 to-primary-800 shadow-lg">
          <div className="px-4 pt-4 pb-4 space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-white hover:bg-primary-500 rounded-lg transition duration-300 font-medium"
              >
                {t(item.label)}
              </a>
            ))}
            <div className="border-t border-primary-500 mt-2 pt-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    handleLanguageChange(lang.code);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 text-white hover:bg-primary-500 rounded-lg transition duration-300 font-medium ${
                    locale === lang.code ? 'bg-primary-500' : ''
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