import * as React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Home from '../components/Home/Home';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'home'])),
    },
  };
};

export default function Index() {
  return (<Home/>);
}