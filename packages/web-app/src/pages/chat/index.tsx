import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Chat } from '../../components/Chat/Chat';
import { Layout } from '../../components/layout/Layout';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default function ChatPage() {
  const { t } = useTranslation('common');

  return (
    <Layout
      title={`${t('menu.psyAI')} - ${t('menu.portalName')}`}
      description={t('chat.description')}
    >
      <div className="container mx-auto px-4 py-8">
        <Chat />
      </div>
    </Layout>
  );
} 