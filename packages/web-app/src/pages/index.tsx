import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as React from 'react';
import axios from 'axios';
import Head from 'next/head';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  }, [router]);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Psychology Portal</title>
        <meta name="description" content="Professional psychology services and resources" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation Menu */}
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

      {/* Hero Banner */}
      <div className="relative bg-indigo-700">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="/images/banner.jpg"
            alt="Psychology background"
          />
          <div className="absolute inset-0 bg-indigo-200 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-24 sm:px-6 lg:py-40 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Your Journey to Mental Wellness
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
              Professional psychological services to support your mental health and personal growth
            </p>
            <div className="mt-10">
              <a
                href="#"
                className="inline-block bg-white py-3 px-8 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
              >
                Book a Consultation
              </a>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Individual Therapy</h2>
            <p className="text-gray-600">Personalized one-on-one counseling sessions</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Group Sessions</h2>
            <p className="text-gray-600">Supportive group therapy and workshops</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Online Counseling</h2>
            <p className="text-gray-600">Virtual therapy sessions from the comfort of your home</p>
          </div>
        </div>
      </main>
    </div>
  );
}