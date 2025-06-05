import { useState } from 'react';

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 shadow-xl backdrop-blur-sm bg-opacity-90 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white tracking-wide hover:text-primary-200 transition-all duration-300 transform hover:scale-105">
                Psychology Portal
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {['Services', 'Home', 'Resources', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white hover:text-primary-200 transition-all duration-300 font-medium relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-200 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-primary-200 transition-all duration-300 transform hover:scale-110"
              >
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-primary-600 via-primary-500 to-secondary-600 shadow-lg backdrop-blur-sm bg-opacity-90 animate-slide-down">
          <div className="px-4 pt-4 pb-4 space-y-2">
            {['Home', 'Services', 'Resources', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className="block px-4 py-3 text-white hover:bg-primary-500/30 rounded-lg transition-all duration-300 font-medium transform hover:scale-105 hover:translate-x-2"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}