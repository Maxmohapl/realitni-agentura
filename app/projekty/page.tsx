import type { Metadata } from 'next';
import ProjectsOverview from './ProjectsOverview';
export const metadata: Metadata = { title: 'Projekty | Realitní Agentura' };
export default function Page() { return <ProjectsOverview />; }
