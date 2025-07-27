import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../components/Layout/Layout';
import SEO from '../components/SEO';
import Notification from '../components/ui/Notification';
import { useNotification } from '../hooks/useNotification';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'faq'])),
    },
  };
}

interface FaqFormData {
  question: string;
  email: string;
  name: string;
  category: string;
}

export default function FAQ() {
  const { t } = useTranslation('common');
  const { notification, showSuccess, showError, hideNotification } = useNotification();
  const [formData, setFormData] = useState<FaqFormData>({
    question: '',
    email: '',
    name: '',
    category: '',
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.question.trim() || !formData.email.trim()) {
      showError('Please fill in the required fields (question and email).');
      return;
    }

    try {
      const response = await fetch('http://localhost:3003/api/faq/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          question: formData.question.trim(),
          email: formData.email.trim(),
          name: formData.name.trim() || undefined,
          category: formData.category.trim() || undefined,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('FAQ question submitted successfully:', result);
        showSuccess(t('faq.askQuestion.notifications.success'));
        setFormData({
          question: '',
          email: '',
          name: '',
          category: '',
        });
      } else {
        throw new Error('Failed to submit question');
      }
    } catch (error) {
      console.error('Error submitting FAQ question:', error);
      showError(t('faq.askQuestion.notifications.error'));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const categories = [
    { value: '', label: t('faq.askQuestion.categoryPlaceholder') },
    { value: 'therapy', label: 'Therapy' },
    { value: 'consultation', label: 'Consultation' },
    { value: 'pricing', label: 'Pricing' },
    { value: 'scheduling', label: 'Scheduling' },
    { value: 'other', label: 'Other' },
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

            <div className='bg-white rounded-lg shadow-lg p-8'>
              <h2 className='text-3xl font-bold text-center text-gray-900 mb-6'>
                {t('faq.askQuestion.title')}
              </h2>
              
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                      {t('faq.askQuestion.email')} <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
                      placeholder={t('faq.askQuestion.emailPlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
                      {t('faq.askQuestion.name')}
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
                      placeholder={t('faq.askQuestion.namePlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor='category' className='block text-sm font-medium text-gray-700 mb-2'>
                    {t('faq.askQuestion.category')}
                  </label>
                  <select
                    id='category'
                    name='category'
                    value={formData.category}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor='question' className='block text-sm font-medium text-gray-700 mb-2'>
                    {t('faq.askQuestion.question')} <span className='text-red-500'>*</span>
                  </label>
                  <textarea
                    id='question'
                    name='question'
                    rows={4}
                    required
                    value={formData.question}
                    onChange={handleChange}
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
      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </>
  );
} 