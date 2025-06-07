import * as React from 'react';
import { useTranslation } from 'next-i18next';

import { Banner, ProblemSolving, Slider, Therapy, Work } from './ui';
import { Layout } from '../layout/Layout';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <Layout
      title={t('menu.portalName')}
      description="Professional psychology services and resources"
    >
      <Banner />
      <ProblemSolving />
      <Work />
      <Therapy />
      <Slider />
    </Layout>
  );
}