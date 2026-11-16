export type PersonalProject = {
    id: string;
    title: string;
    tagline: string;
    description: string;
    tech: string[];
    liveUrl?: string;
    repoUrl?: string;
    image?: string;
    featured?: boolean;
    status: 'live' | 'demo' | 'wip' | 'planned';
    highlights?: string[];
};

export const personalProjects: PersonalProject[] = [
    {
        id: 'deed-finance',
        title: 'Deed Finance',
        tagline: 'Personal finance tracker with live bank & currency data',
        description:
            'Track money across multiple accounts and currencies, log expenses and incomes, plan budgets, set savings goals, manage debts and recurring bills, and get e-mail reminders. Built on Clean Architecture with CQRS and an Angular SPA.',
        tech: ['ASP.NET Core 9', 'CQRS / MediatR', 'Angular 20', 'SQL Server', 'Redis', 'Quartz.NET', 'Docker', 'Fly.io', 'Netlify'],
        liveUrl: 'https://deed-mvasylyshyn.netlify.app',
        repoUrl: 'https://github.com/Maximiliyano/deed-finance-web-app',
        image: '/projects/deed-finance.jpg',
        featured: true,
        status: 'live',
        highlights: [
            'Multi-currency capitals with cross-currency transfers',
            'PrivatBank rates and Monobank API integration, cached in Redis',
            'Budget planner, goals, debts and recurring utility bills',
            'Anonymous demo mode, Auth0 sign-in, dark/light theme',
        ],
    },
    {
        id: 'price-scanner',
        title: 'Price & Review Scanner',
        tagline: 'Scan a product, compare prices and reviews everywhere',
        description:
            'Point the camera at a product or its barcode and see how it is rated and priced across different websites, and where to buy it, all in one place.',
        tech: ['Barcode scan', 'Image search', 'Price comparison', 'Reviews & ratings', 'Store locations'],
        status: 'planned',
        highlights: [
            'Scan an image or a barcode to identify the product',
            'Pulls reviews and ratings from multiple websites as data sources',
            'Compares prices across sources',
            'Shows locations where the product is available',
        ],
    },
    {
        id: 'video-tracking',
        title: 'Self-Hosted Video Tracking',
        tagline: 'Video tracking that keeps working offline',
        description:
            'A video tracking system that runs on my own server, with an offline mode so it keeps working without an internet connection.',
        tech: ['Self-hosted', 'Offline mode', 'Video tracking'],
        status: 'planned',
        highlights: [
            'Runs on my own server, no cloud required',
            'Offline mode for use without an internet connection',
        ],
    },
    {
        id: 'portfolio',
        title: 'This Portfolio',
        tagline: 'The site you are looking at',
        description:
            'Vite, React 19, TypeScript and Tailwind 4, hosted on Netlify. The terminal section answers questions from the same typed data files that drive the pages.',
        tech: ['React 19', 'TypeScript', 'Tailwind 4', 'framer-motion', 'Vite', 'Netlify'],
        liveUrl: 'https://portfolio-mvasylyshyn.netlify.app',
        repoUrl: 'https://github.com/Maximiliyano/portfolio',
        image: '/projects/portfolio.jpg',
        status: 'live',
    },
];

export default personalProjects;
