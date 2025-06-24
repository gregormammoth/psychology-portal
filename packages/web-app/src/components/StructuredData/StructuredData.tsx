import { useTranslation } from 'next-i18next';

interface StructuredDataProps {
  type: 'organization' | 'medicalBusiness' | 'article' | 'faq' | 'person';
  data?: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const { t } = useTranslation('common');
  
  const getOrganizationData = () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Екатерина Иванова - Клинический психолог',
    url: 'https://psychologyportal.com',
    logo: 'https://psychologyportal.com/logo.png',
    description: t('seo.defaultDescription'),
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RU'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Russian', 'English']
    },
    sameAs: [
      'https://t.me/Katerina_Iva_nova'
    ]
  });

  const getMedicalBusinessData = () => ({
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Екатерина Иванова - Клинический психолог',
    description: t('seo.defaultDescription'),
    url: 'https://psychologyportal.com',
    telephone: '+7-xxx-xxx-xxxx',
    email: 'contact@psychologyportal.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RU'
    },
    openingHours: 'Mo-Th 09:00-18:00',
    priceRange: '2500 руб',
    medicalSpecialty: 'Клиническая психология',
    availableService: [
      {
        '@type': 'MedicalService',
        name: 'Индивидуальная онлайн-консультация',
        description: 'Когнитивно-поведенческая терапия (КПТ) - 60 минут'
      },
      {
        '@type': 'MedicalService',
        name: 'Предварительная встреча',
        description: 'Бесплатная консультация 15-20 минут'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Психологические услуги',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Консультация клинического психолога',
            description: 'Когнитивно-поведенческая терапия онлайн'
          },
          price: '2500',
          priceCurrency: 'RUB',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '2500',
            priceCurrency: 'RUB',
            unitText: 'сессия'
          }
        }
      ]
    }
  });

  const getPersonData = () => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Екатерина Иванова',
    jobTitle: 'Клинический психолог',
    description: 'Клинический психолог с 10-летним опытом работы. Специализация: когнитивно-поведенческая терапия (КПТ).',
    url: 'https://psychologyportal.com',
    image: 'https://psychologyportal.com/images/ekaterina-ivanova.jpg',
    sameAs: [
      'https://t.me/Katerina_Iva_nova'
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Тверской Государственный Университет',
      description: 'Клинический психолог (2014)'
    },
    hasCredential: [
      'Клинический психолог (Тверской Государственный Университет, 2014)',
      'Психотерапия (РМАПО)',
      'КПТ в консультировании (Институт «Метафора»)'
    ],
    knowsAbout: [
      'Когнитивно-поведенческая терапия',
      'Тревожность и панические атаки',
      'Депрессия и апатия',
      'Низкая самооценка',
      'Стресс и выгорание',
      'Навязчивые мысли',
      'Работа с детьми с РАС'
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Частная практика'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RU'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'Russian'
    }
  });

  const getArticleData = (articleData: any) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: articleData?.title || 'Статья по психологии',
    description: articleData?.description || t('seo.pages.articles.description'),
    image: articleData?.image || 'https://psychologyportal.com/images/article-default.jpg',
    author: {
      '@type': 'Person',
      name: 'Екатерина Иванова',
      jobTitle: 'Клинический психолог'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Екатерина Иванова - Клинический психолог',
      logo: {
        '@type': 'ImageObject',
        url: 'https://psychologyportal.com/logo.png'
      }
    },
    datePublished: articleData?.datePublished || new Date().toISOString(),
    dateModified: articleData?.dateModified || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleData?.url || 'https://psychologyportal.com/ru/articles'
    },
    articleSection: 'Клиническая психология',
    keywords: articleData?.keywords || t('seo.pages.articles.keywords')
  });

  const getFAQData = () => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Как записаться на консультацию к Екатерине Ивановой?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Вы можете записаться на консультацию через форму на сайте, по телеграму @Katerina_Iva_nova или по телефону. Предварительная встреча (15-20 минут) бесплатно.'
        }
      },
      {
        '@type': 'Question',
        name: 'Сколько стоит консультация у Екатерины Ивановой?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Стоимость индивидуальной консультации (60 минут) - 2500 руб. Предварительная встреча (15-20 минут) - бесплатно.'
        }
      },
      {
        '@type': 'Question',
        name: 'Какие проблемы решает Екатерина Иванова?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Екатерина специализируется на тревоге и панических атаках, депрессии и апатии, низкой самооценке, стрессе и выгорании, навязчивых мыслях. Использует когнитивно-поведенческую терапию (КПТ).'
        }
      },
      {
        '@type': 'Question',
        name: 'Какое образование у Екатерины Ивановой?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Клинический психолог (Тверской Государственный Университет, 2014), повышение квалификации: Психотерапия (РМАПО), КПТ в консультировании (Институт «Метафора»).'
        }
      },
      {
        '@type': 'Question',
        name: 'Какой опыт работы у Екатерины Ивановой?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '10 лет опыта работы, включая 7 лет работы с детьми с расстройствами аутистического спектра, работу в психоневрологическом санатории, коррекционном центре для детей с РАС.'
        }
      }
    ]
  });

  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return getOrganizationData();
      case 'medicalBusiness':
        return getMedicalBusinessData();
      case 'person':
        return getPersonData();
      case 'article':
        return getArticleData(data);
      case 'faq':
        return getFAQData();
      default:
        return getMedicalBusinessData();
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData())
      }}
    />
  );
} 