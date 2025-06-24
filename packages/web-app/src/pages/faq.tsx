import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../components/Layout/Layout';
import SEO from '../components/SEO';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'faq'])),
    },
  };
}

export default function FAQ() {
  const { t } = useTranslation('common');

  const faqData = [
    {
      question: t('faq.questions.therapy.question'),
      answer: t('faq.questions.therapy.answer')
    },
    {
      question: t('faq.questions.duration.question'),
      answer: t('faq.questions.duration.answer')
    },
    {
      question: t('faq.questions.confidentiality.question'),
      answer: t('faq.questions.confidentiality.answer')
    },
    {
      question: t('faq.questions.preparation.question'),
      answer: t('faq.questions.preparation.answer')
    },
    {
      question: t('faq.questions.online.question'),
      answer: t('faq.questions.online.answer')
    },
    {
      question: t('faq.questions.emergency.question'),
      answer: t('faq.questions.emergency.answer')
    },
    {
      question: t('faq.questions.medication.question'),
      answer: t('faq.questions.medication.answer')
    },
    {
      question: t('faq.questions.family.question'),
      answer: t('faq.questions.family.answer')
    }
  ];

  return (
    <>
      <SEO
        title={`${t('faq.title')} - Екатерина Иванова`}
        description={t('faq.description')}
        keywords="FAQ, часто задаваемые вопросы, психология, терапия, консультации, Екатерина Иванова"
        url="https://psychologyportal.com/ru/faq"
        locale="ru"
        structuredDataType="faq"
        structuredData={faqData}
      />
      <Layout
        title={t('faq.title')}
        description={t('faq.description')}
      >
        <div className='min-h-screen bg-gray-50 py-12'>
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
            {/* Header */}
            <div className='text-center mb-12'>
              <h1 className='text-4xl font-bold text-gray-900 mb-4'>
                {t('faq.title')}
              </h1>
              <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                {t('faq.subtitle')}
              </p>
            </div>

            {/* FAQ Accordion */}
            <div className='space-y-4 mb-16'>
              {faqData.map((faq, index) => (
                <details key={index} className='bg-white rounded-lg shadow-md overflow-hidden'>
                  <summary className='cursor-pointer px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors duration-200'>
                    {faq.question}
                  </summary>
                  <div className='px-6 py-4 bg-gray-50 border-t border-gray-200'>
                    <p className='text-gray-700 leading-relaxed'>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>

            {/* Ask Question Form */}
            <div className='bg-white rounded-lg shadow-lg p-8'>
              <h2 className='text-3xl font-bold text-center text-gray-900 mb-6'>
                {t('faq.askQuestion.title')}
              </h2>
              
              <form className='space-y-6'>
                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                    {t('faq.askQuestion.email')}
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
                    placeholder={t('faq.askQuestion.emailPlaceholder')}
                  />
                </div>
                
                <div>
                  <label htmlFor='question' className='block text-sm font-medium text-gray-700 mb-2'>
                    {t('faq.askQuestion.question')}
                  </label>
                  <textarea
                    id='question'
                    name='question'
                    rows={4}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
                    placeholder={t('faq.askQuestion.questionPlaceholder')}
                  />
                </div>
                
                <button
                  type='submit'
                  className='w-full bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 transition-colors duration-200 font-medium text-lg'
                >
                  {t('faq.askQuestion.submit')}
                </button>
              </form>
              
              <p className='text-sm text-gray-500 text-center mt-4'>
                {t('faq.askQuestion.responseTime')}
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
} 