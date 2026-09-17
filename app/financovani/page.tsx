import type { Metadata } from 'next';
import FinanceCalculator from './FinanceCalculator';
export const metadata: Metadata = { title: 'Financování | Realitní Agentura' };
export default function Page() { return <FinanceCalculator />; }
