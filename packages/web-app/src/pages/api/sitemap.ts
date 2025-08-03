import { NextApiRequest, NextApiResponse } from 'next';

const articles = [
  {
    id: 1,
    title: 'О тех, кто остаётся невидимым',
    date: '2024-04-03',
  },
  {
    id: 2,
    title: 'Синдром самозванца: когда успех кажется случайностью',
    date: '2024-03-28',
  },
  {
    id: 3,
    title: 'Роль социальных сетей в развитии синдрома самозванца',
    date: '2024-03-25',
  },
  {
    id: 4,
    title: 'Взросление: когда мы перестаём ждать разрешения',
    date: '2024-03-20',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const currentDate = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${baseUrl}/ru/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/ru/"/>
    <xhtml:link rel="alternate" hreflang="sr" href="${baseUrl}/sr/"/>
  </url>
  <url>
    <loc>${baseUrl}/ru/chat</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/chat"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/ru/chat"/>
    <xhtml:link rel="alternate" hreflang="sr" href="${baseUrl}/sr/chat"/>
  </url>
  <url>
    <loc>${baseUrl}/ru/articles</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/articles"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/ru/articles"/>
    <xhtml:link rel="alternate" hreflang="sr" href="${baseUrl}/sr/articles"/>
  </url>
  ${articles.map(article => `
  <url>
    <loc>${baseUrl}/ru/articles/${article.id}</loc>
    <lastmod>${article.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/articles/${article.id}"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/ru/articles/${article.id}"/>
    <xhtml:link rel="alternate" hreflang="sr" href="${baseUrl}/sr/articles/${article.id}"/>
  </url>`).join('')}
  <url>
    <loc>${baseUrl}/ru/contacts</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/contacts"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/ru/contacts"/>
    <xhtml:link rel="alternate" hreflang="sr" href="${baseUrl}/sr/contacts"/>
  </url>
  <url>
    <loc>${baseUrl}/ru/faq</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/faq"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/ru/faq"/>
    <xhtml:link rel="alternate" hreflang="sr" href="${baseUrl}/sr/faq"/>
  </url>
  <url>
    <loc>${baseUrl}/ru/login</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/login"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/ru/login"/>
    <xhtml:link rel="alternate" hreflang="sr" href="${baseUrl}/sr/login"/>
  </url>
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.status(200).send(sitemap);
} 