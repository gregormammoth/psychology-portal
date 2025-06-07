import { useState } from 'react';

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/chat', label: 'Psy AI' },
    { href: '/articles', label: 'Articles' },
    { href: '/contacts', label: 'Contact' },
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-primary-600 to-primary-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-white tracking-wide hover:text-primary-200 transition duration-300">Psychology Portal</a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-primary-200 transition duration-300 font-medium"
                >
                  {item.label}
                </a>
              ))}
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
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}