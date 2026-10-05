import { env } from 'cloudflare:workers';
import { ready, type InquiryEnv } from '@/lib/inquiries/service';
export const dynamic = 'force-dynamic';
export function GET(){const config=env as unknown as InquiryEnv;return Response.json({enabled:ready(config),siteKey:ready(config)?config.TURNSTILE_SITE_KEY:null},{headers:{'Cache-Control':'no-store'}});}
