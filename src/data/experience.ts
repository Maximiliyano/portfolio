export type ExperienceItem = {
    company: string;
    companyLogo?: string;
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
        company: 'Coherent Solutions, Inc.',
        companyLogo: 'https://www.coherentsolutions.com/hubfs/favicon-96x96.png',
        role: 'Software Engineer',
        start: 'Feb 2026',
        end: 'Present',
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
        company: 'DataArt Solutions, Inc.',
        companyLogo: 'https://www.dataart.com/favicon.ico',
        role: 'Software Developer',
        start: 'Feb 2024',
        end: 'Feb 2026',
        location: 'Hybrid',
        city: 'Lviv',
        country: 'UA',
        bullets: [
            'Developed multiple internal and client-facing systems as full-stack .NET developer',
            'Improved performance and implemented caching strategies',
            'Contributed to Azure deployment pipelines and infrastructure automation'
        ],
        tech: ['.NET Core 6-9', '.NET Framework 4.7', 'Angular', 'React', 'knockout.js', 'Azure', 'mediaMTX', 'EventStore', 'RavenDB', 'xUnit', 'SQL Server', 'AI Development']
    },
    {
        company: 'Vector Software, Ltd.',
        companyLogo: 'https://vector-software.com/wp-content/uploads/2023/07/cropped-favicon-32x32.png',
        role: 'Automation QA Engineer',
        start: 'Aug 2022',
        end: 'Dec 2022',
        location: 'Hybrid',
        city: 'Lviv',
        country: 'UA',
        bullets: [
            'Built automated test suites (unit, integration, E2E, UI)',
            'Collaborated with client teams and maintained nightly runs',
            'Performed refactoring and debugging of test infrastructure'
        ],
        tech: ['.NET Core', 'Angular', 'SQL Server', 'Azure', 'NUnit3', 'Selenium' ]
    }
];

export default experience;
