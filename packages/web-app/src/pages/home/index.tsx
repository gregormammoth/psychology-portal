import Head from 'next/head';
import { useState } from 'react';

import { Banner, Menu } from './ui';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Psychology Portal</title>
        <meta name="description" content="Professional psychology services and resources" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu/>
      <Banner/>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border-t-4 border-primary-500">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Individual Therapy</h2>
            <p className="text-gray-600">Personalized one-on-one counseling sessions</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border-t-4 border-primary-500">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Group Sessions</h2>
            <p className="text-gray-600">Supportive group therapy and workshops</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border-t-4 border-primary-500">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Online Counseling</h2>
            <p className="text-gray-600">Virtual therapy sessions from the comfort of your home</p>
          </div>
        </div>
      </main>
    </div>
  );
} 