import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Chat } from '../../components/Chat/Chat';
import { Layout } from '../../components/Layout/Layout';
import SEO from '../../components/SEO';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default function ChatPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <SEO
        title={t('seo.pages.chat.title')}
        description={t('seo.pages.chat.description')}
        keywords={t('seo.pages.chat.keywords')}
        url="https://psychologyportal.com/ru/chat"
        locale="ru"
      />
      <Layout
        title={`${t('menu.psyAI')} - ${t('menu.portalName')}`}
        description={t('chat.description')}
      >
        <div className="container mx-auto px-4 py-8">
          <Chat />
        </div>
      </Layout>
    </>
  );
} 