import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import StructuredData from '../StructuredData';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  locale?: string;
  structuredDataType?: 'organization' | 'medicalBusiness' | 'article' | 'faq' | 'person';
  structuredData?: any;
}

export default function SEO({
  title,
  description,
  keywords,
  image = '/images/ekaterina-ivanova-og.jpg',
  url,
  type = 'website',
  locale = 'ru',
  structuredDataType = 'person',
  structuredData
}: SEOProps) {
  const { t } = useTranslation('common');
  
  const defaultTitle = t('seo.defaultTitle');
  const defaultDescription = t('seo.defaultDescription');
  const defaultKeywords = t('seo.defaultKeywords');
  
  const seoTitle = title || defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoUrl = url || 'https://psychologyportal.com';
  
  return (
    <Head>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={locale} />
      <meta name="author" content="Екатерина Иванова" />
      
      <link rel="canonical" href={seoUrl} />
      <link rel="alternate" hrefLang="ru" href={`${seoUrl}/ru`} />
      <link rel="alternate" hrefLang="en" href={`${seoUrl}/en`} />
      <link rel="alternate" hrefLang="sr" href={`${seoUrl}/sr`} />
      <link rel="alternate" hrefLang="x-default" href={seoUrl} />
      
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="Екатерина Иванова - Клинический психолог" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={image} />
      
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      <StructuredData type={structuredDataType} data={structuredData} />
    </Head>
  );
} 