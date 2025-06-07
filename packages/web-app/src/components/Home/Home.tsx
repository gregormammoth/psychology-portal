import * as React from 'react';
import Head from 'next/head';

import { Banner, /*Chat, Footer, Menu,*/ ProblemSolving, Slider, Therapy, Work } from './ui';
import { Layout } from '../layout/Layout';

export default function Home() {

  return (
    <Layout
      title="Psychology Portal"
      description="Professional psychology services and resources"
    >
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