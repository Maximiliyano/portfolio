import type { IconType } from 'react-icons';
import { SiDotnet, SiTypescript, SiJavascript, SiReact, SiAngular, SiTailwindcss, SiPostgresql, SiMongodb, SiDocker, SiRedis } from 'react-icons/si';
import { TbBrandCSharp, TbBrandAzure } from 'react-icons/tb';
import { DiMsqlServer } from 'react-icons/di';
import { FaAws } from 'react-icons/fa';

export type StackItem = { name: string; Icon: IconType; color: string };

export const stack: StackItem[] = [
    { name: 'C#', Icon: TbBrandCSharp, color: '#239120' },
    { name: '.NET', Icon: SiDotnet, color: '#512BD4' },
    { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
    { name: 'JavaScript', Icon: SiJavascript, color: '#C9A400' },
    { name: 'React', Icon: SiReact, color: '#1AA7CC' },
    { name: 'Angular', Icon: SiAngular, color: '#DD0031' },
    { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'SQL Server', Icon: DiMsqlServer, color: '#CC2927' },
    { name: 'PostgreSQL', Icon: SiPostgresql, color: '#336791' },
    { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
    { name: 'Redis', Icon: SiRedis, color: '#DC382D' },
    { name: 'Azure', Icon: TbBrandAzure, color: '#0078D4' },
    { name: 'AWS', Icon: FaAws, color: '#E68A00' },
    { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
];

export default stack;
