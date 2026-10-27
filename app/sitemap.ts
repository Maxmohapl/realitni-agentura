import type { MetadataRoute } from 'next';
import { publicProperties } from '@/lib/urbium/repository';
import { projects } from './projekty/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.SITE_URL || 'https://www.realitni-agentura.cz').replace(/\/$/, '');
  const staticRoutes = ['', '/nabidka', '/nase-sluzby', '/o-nas', '/nas-tym', '/financovani', '/projekty', '/kontakt', '/pravni-informace', '/podminky-zpracovani-udaju', ...projects.map(project => project.href)];
  return [...staticRoutes.map((route) => ({ url: `${base}${route}`, changeFrequency: route === '/nabidka' ? 'daily' as const : 'weekly' as const, priority: route === '' ? 1 : .7 })), ...(await publicProperties()).map((property) => ({ url: `${base}/nemovitosti/${property.slug}`, lastModified: property.updatedAt || property.publishedAt || undefined, changeFrequency: 'daily' as const, priority: .8 }))];
}
