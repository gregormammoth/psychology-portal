import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../../components/Layout/Layout';
import SEO from '../../components/SEO';
import { Contacts } from '@/components/Contacts';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function ContactsPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <SEO
        title={t('seo.pages.contacts.title')}
        description={t('seo.pages.contacts.description')}
        keywords={t('seo.pages.contacts.keywords')}
        url={`${process.env.NEXT_PUBLIC_URL}/contacts`}
        locale="ru"
      />
      <Layout
        title={t('contacts.title')}
        description={t('contacts.subtitle')}
      >
        <Contacts />
      </Layout>
    </>
  );
}