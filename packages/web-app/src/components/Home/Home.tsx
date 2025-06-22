import * as React from 'react';
import { useTranslation } from 'next-i18next';

import { Banner, ProblemSolving, Slider, Therapy, Work } from './ui';
import { Layout } from '../Layout/Layout';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <Layout
      title={t('menu.portalName')}
      description={t('home.banner.description')}
    >
      <Banner />
      <ProblemSolving />
      <Work />
      <Therapy />
      <Slider />
    </Layout>
  );
}