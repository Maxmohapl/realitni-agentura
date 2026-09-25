import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots { const base = process.env.SITE_URL || 'https://www.realitni-agentura.cz'; return { rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/internal/'] }, sitemap: `${base}/sitemap.xml` }; }
