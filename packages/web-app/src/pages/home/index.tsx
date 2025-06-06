import * as React from 'react';
import Head from 'next/head';

import { Banner, Chat, Footer, Menu, ProblemSolving, Slider, Therapy, Work } from './ui';

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Psychology Portal</title>
        <meta name="description" content="Professional psychology services and resources" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />
      <Banner />

      <main className="bg-primary-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProblemSolving />
        <Work />
        <Therapy />
        <Slider />
      </main>
      <Footer/>
      <Chat />
    </div>
  );
}