import { useState } from 'react';

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white tracking-wide">Psychology Portal</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-indigo-200 transition duration-300 font-medium">Home</a>
              <a href="#" className="text-white hover:text-indigo-200 transition duration-300 font-medium">Services</a>
              <a href="#" className="text-white hover:text-indigo-200 transition duration-300 font-medium">Resources</a>
              <a href="#" className="text-white hover:text-indigo-200 transition duration-300 font-medium">About</a>
              <a href="#" className="text-white hover:text-indigo-200 transition duration-300 font-medium">Contact</a>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-indigo-200 transition duration-300"
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
        <div className="md:hidden bg-gradient-to-b from-indigo-600 to-purple-600 shadow-lg">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <a href="#" className="block px-4 py-3 text-white hover:bg-indigo-500 rounded-lg transition duration-300 font-medium">Home</a>
            <a href="#" className="block px-4 py-3 text-white hover:bg-indigo-500 rounded-lg transition duration-300 font-medium">Services</a>
            <a href="#" className="block px-4 py-3 text-white hover:bg-indigo-500 rounded-lg transition duration-300 font-medium">Resources</a>
            <a href="#" className="block px-4 py-3 text-white hover:bg-indigo-500 rounded-lg transition duration-300 font-medium">About</a>
            <a href="#" className="block px-4 py-3 text-white hover:bg-indigo-500 rounded-lg transition duration-300 font-medium">Contact</a>
          </div>
        </div>
      )}
    </>
  )
}