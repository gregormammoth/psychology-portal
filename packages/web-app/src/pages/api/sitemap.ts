import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseUrl = 'https://psychologyportal.com';
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <url>
    <loc>${baseUrl}/ru</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/ru"/>
    <xhtml:link rel="alternate" hreflang="sr" href="${baseUrl}/sr"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}"/>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/ru/chat</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/chat"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/ru/chat"/>
    <xhtml:link rel="alternate" hreflang="sr" href="${baseUrl}/sr/chat"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/chat"/>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/ru/articles</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/articles"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/ru/articles"/>
    <xhtml:link rel="alternate" hreflang="sr" href="${baseUrl}/sr/articles"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/articles"/>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/ru/contacts</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/contacts"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/ru/contacts"/>
    <xhtml:link rel="alternate" hreflang="sr" href="${baseUrl}/sr/contacts"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/contacts"/>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/ru/faq</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/faq"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/ru/faq"/>
    <xhtml:link rel="alternate" hreflang="sr" href="${baseUrl}/sr/faq"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/faq"/>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/ru/login</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/login"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${baseUrl}/ru/login"/>
    <xhtml:link rel="alternate" hreflang="sr" href="${baseUrl}/sr/login"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/login"/>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();
} 