import { env } from 'cloudflare:workers';
import { handleInquiry, type InquiryEnv } from '@/lib/inquiries/service';
export const dynamic = 'force-dynamic';
export function POST(request:Request){return handleInquiry(request,env as unknown as InquiryEnv);}
