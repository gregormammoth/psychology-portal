import * as React from 'react';
import Head from 'next/head';

import { Banner, /*Chat, Footer, Menu,*/ ProblemSolving, Slider, Therapy, Work } from './ui';
import { Layout } from '../../components/layout/Layout';

export default function Home() {

  return (
    <Layout
      title="Psychology Portal<"
      description="Professional psychology services and resources"
    >
      {/* <div className="min-h-screen bg-gray-50"> */}
      {/* <Head>
        <title>Psychology Portal</title>
        <meta name="description" content="Professional psychology services and resources" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      {/* <Menu /> */}
      <Banner />

        <ProblemSolving />
        <Work />
        <Therapy />
        <Slider />
      {/* <Footer /> */}
      {/* <Chat /> */}
      {/* </div> */}
    </Layout>
  );
}