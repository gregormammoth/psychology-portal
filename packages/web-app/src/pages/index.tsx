import * as React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Home from '../components/Home/Home';
import SEO from '../components/SEO';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
    },
  };
};

export default function Index() {
  const { t } = useTranslation('common');
  
  return (
    <>
      <SEO
        title={t('seo.pages.home.title')}
        description={t('seo.pages.home.description')}
        keywords={t('seo.pages.home.keywords')}
        url={`${process.env.NEXT_PUBLIC_URL}/ru`}
        locale="ru"
        structuredDataType="person"
      />
      <Home/>
    </>
  );
}