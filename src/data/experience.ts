import { companies, type Company } from "./companies";

export type ExperienceItem = {
    company: Company;
    role: string;
    start: string;
    end?: string;
    location?: 'Hybrid' | 'Remote';
    city?: string;
    country?: string;
    bullets: string[];
    tech?: string[];
};

export const experience: ExperienceItem[] = [
    {
        company: companies.EPAM,
        role: 'Software Engineer',
        start: 'Apr 2026',
        end: 'Present',
        location: 'Hybrid',
        city: 'Lviv',
        country: 'UA',
        bullets: [
            'Medical software development for a US-based client in the healthcare industry;',
            'Migration of legacy database MSSQL to PostgreSQL with backward compatibility.'
        ],
        tech: ['.NET Core', 'Azure Cloud Services', 'SQL Server', 'AWS', 'PostgreSQL']
    },
    {
        company: companies.CoherentSolutions,
        role: 'Software Engineer',
        start: 'Feb 2026',
        end: 'Apr 2026',
        location: 'Remote',
        city: 'Lviv',
        country: 'UA',
        bullets: [
            'Designed and implemented RESTful APIs for frontend and external integrations;',
            'Wrote unit tests and participate in code reviews.'
        ],
        tech: ['.NET Core', 'Azure Cloud Services', 'SQL Server', 'Dapper', 'xUnit', 'Angular', 'AI Development']
    },
    {
        company: companies.DataArt,
        role: 'Software Engineer',
        start: 'Feb 2024',
        end: 'Feb 2026',
        location: 'Hybrid',
        city: 'Lviv',
        country: 'UA',
        bullets: [
            'Developed multiple internal and client-facing systems as full-stack .NET engineer',
            'Improved performance and implemented caching strategies',
            'Contributed to Azure deployment pipelines and infrastructure automation'
        ],
        tech: ['.NET Core 6-9', '.NET Framework 4.7', 'Angular', 'React', 'knockout.js', 'Azure', 'mediaMTX', 'EventStore', 'RavenDB', 'xUnit', 'SQL Server', 'AI Development']
    },
    {
        company: companies.VectorSoftware,
        role: 'Automation QA Engineer',
        start: 'Aug 2021',
        end: 'Dec 2023',
        location: 'Hybrid',
        city: 'Lviv',
        country: 'UA',
        bullets: [
            'Migration of Framework to Core app with micro-services infrastructure',
            'Built automated test suites (unit, integration, E2E, UI)',
            'Collaborated with client teams and maintained nightly runs',
            'Performed refactoring and debugging of test infrastructure'
        ],
        tech: ['.NET Framework 4.6', '.NET Core 5', 'Angular', 'SQL Server', 'Azure', 'NUnit3', 'Selenium' ]
    }
];

export default experience;
