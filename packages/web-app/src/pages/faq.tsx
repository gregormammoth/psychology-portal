import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from '../components/Layout/Layout';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function FAQ() {
  const { t } = useTranslation('common');

  const faqData = [
    {
      question: 'What is therapy and how can it help me?',
      answer: 'Therapy is a collaborative process between you and a trained mental health professional. It provides a safe, confidential space to explore your thoughts, feelings, and behaviors. Therapy can help you develop coping strategies, gain insight into patterns, and work toward your personal goals for mental wellness.'
    },
    {
      question: 'How long does therapy typically last?',
      answer: 'The duration of therapy varies greatly depending on your individual needs, goals, and circumstances. Some people benefit from short-term therapy (6-12 sessions), while others engage in longer-term work. We will regularly assess your progress and adjust the treatment plan as needed.'
    },
    {
      question: 'Is everything I share in therapy confidential?',
      answer: 'Yes, confidentiality is a cornerstone of therapy. Everything you share is kept strictly confidential, with very limited exceptions required by law (such as imminent risk of harm to yourself or others). We will discuss confidentiality limits during your first session.'
    },
    {
      question: 'How should I prepare for my first therapy session?',
      answer: 'Come as you are! There is no special preparation needed. You might want to think about what brought you to therapy and what you hope to achieve. Bring any questions you have about the process. Most importantly, be open and honest about your experiences.'
    },
    {
      question: 'Do you offer online therapy sessions?',
      answer: 'Yes, we offer secure online therapy sessions via video call. Online therapy can be just as effective as in-person sessions and offers greater flexibility and accessibility. We use secure, HIPAA-compliant platforms to ensure your privacy and safety.'
    },
    {
      question: 'What should I do in a mental health emergency?',
      answer: 'If you are experiencing a mental health emergency or having thoughts of self-harm, please call emergency services (911) or go to your nearest emergency room immediately. You can also contact the National Suicide Prevention Lifeline at 988 for 24/7 support.'
    },
    {
      question: 'Do you prescribe medication?',
      answer: 'As a psychologist, I do not prescribe medication. However, I work closely with psychiatrists and other medical professionals when medication might be beneficial as part of your treatment plan. I can provide referrals and coordinate care as needed.'
    },
    {
      question: 'Can family members or friends join my therapy sessions?',
      answer: 'In some cases, involving family members or close friends can be beneficial. This depends on your goals, comfort level, and the nature of your concerns. We can discuss whether family or couples sessions might be helpful for your specific situation.'
    }
  ];

  return (
    <Layout
      title='Frequently Asked Questions'
      description='Find answers to common questions about psychology and therapy services'
    >
      <div className='min-h-screen bg-gray-50 py-12'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Header */}
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold text-gray-900 mb-4'>
              Frequently Asked Questions
            </h1>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              Find answers to common questions about our psychology services and therapy process
            </p>
          </div>

          {/* FAQ Accordion - Static HTML for now */}
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
              Have a Question?
            </h2>
            
            <form className='space-y-6'>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                  Your Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  required
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
                  placeholder='your.email@example.com'
                />
              </div>
              
              <div>
                <label htmlFor='question' className='block text-sm font-medium text-gray-700 mb-2'>
                  Your Question
                </label>
                <textarea
                  id='question'
                  name='question'
                  rows={4}
                  required
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
                  placeholder='What would you like to know about our services?'
                />
              </div>
              
              <button
                type='submit'
                className='w-full bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 transition-colors duration-200 font-medium text-lg'
              >
                Send Question
              </button>
            </form>
            
            <p className='text-sm text-gray-500 text-center mt-4'>
              We typically respond to questions within 24 hours during business days.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 