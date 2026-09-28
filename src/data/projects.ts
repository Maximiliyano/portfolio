import { companies, type Company } from './companies';
import type { DomainId } from './domains';

export type Project = {
    id: string;
    title: string;
    start: string;
    end?: string;
    company: Company;
    country: string;
    clientType: string;
    domains: DomainId[];
    teamSize?: number;
    summary: string;
    role: string;
    tech: string[];
    responsibilities: string[];
    images: string[];
};

export const projects: Project[] = [
    {
        id: 'medical-device-management-system',
        images: ['https://image-hosting-api.fly.dev/api/images/6aba4c01726918a84bdc72ee.jpg'],
        title: 'Medical Device Management System',
        start: 'Apr 2026',
        end: 'Present',
        company: companies.EPAM,
        country: 'NL',
        clientType: 'Medical Device Manufacturer',
        domains: ['healthcare'],
        teamSize: 10,
        summary: 'The project was about patient monitoring platform and associated applications. Installed in hospitals and supporting beds to ensure patient health safety with on-premise infrastructure using AWS Cloud, Postgres and SQL Server with backward compatibility.',
        role: 'Full-Stack Software Engineer',
        tech: ['.NET Framework 4.8', 'WCF', 'Amazon Web Services', 'EC2', 'Postgres', 'SQL Server', 'Azure DevOps', 'Claude', 'Codemie'],
        responsibilities: [
            'Performed migration from MSSQL implementation to the PostgreSQL with backward compatibility',
            'Supported application installation process within integration for infrastructure operations',
            'Demo sharing of implemented functionality to align on tech requirement and resolve project challenges',
            'Developed PowerShell and SQL scripts to automate deployement and configuration processes'
        ]
    },
    {
        id: 'transport-and-schedule-system',
        images: ['https://image-hosting-api.fly.dev/api/images/69fe3624d32fa239a62a5f4b.png'],
        title: 'Public Transport and Schedule System',
        start: 'Feb 2026',
        end: 'Apr 2026',
        company: companies.CoherentSolutions,
        country: 'CA',
        clientType: 'Public Transport Operator',
        domains: ['transportation', 'ai-ml'],
        teamSize: 8,
        summary: "The project focuses on developing and modernizing a platform, replacing an existing on-premise solution with a cloud-based architecture. The system supports vehicle and operator scheduling, route planning, timetables, blocking, runcutting, and rostering.",
        role: "Full-Stack Software Engineer",
        tech: ['.NET Core', 'Azure Cloud Services', 'SQL Server', 'Claude', 'StoredProcedures', 'Triggers', 'Dapper', 'BitBucket', 'SonarQube', 'Angular'],
        responsibilities: [
            'Designed and implemented RESTful APIs for seamless frontend integration and external system communication',
            'AI driven development using skills, plugins, MCP server integrations',
            'Developed unit tests to ensure code reliability and participated in peer code reviews to maintain high-quality standards',
            'Performed bug fixing, tracing, and provided setup and support across a microservices architecture',
            'Managed API development and created direct stored procedures for SQL database communication, including table and relationship design',
            'Led feature architecture design and backend implementation to ensure scalable and efficient solutions',
            'Conducted refactoring activities to enhance solution quality, directly influencing team planning and breaking down epics into actionable tasks'
        ]
    },
    {
        id: 'ai-agents-platform',
        images: ['https://image-hosting-api.fly.dev/api/images/6aba4b8b726918a84bdc72ec.jpg'],
        title: 'AI Agents Platform',
        start: 'Sep 2025',
        end: 'Feb 2026',
        company: companies.DataArt,
        country: 'US',
        clientType: 'Artificial Intelligence',
        domains: ['ai-ml'],
        teamSize: 6,
        summary: "Developed a scalable AI-driven platform focused on orchestrating intelligent agents to support investment workflows and decision-making processes. The system emphasized modular architecture, high performance, and seamless integration with existing enterprise tools.",
        role: "Full-Stack Software Engineer",
        tech: ['.NET Core', '.NET Aspire', 'Microsoft Orleans', 'Semantic Kernel', 'Model Context Protocol (MCP)'],
        responsibilities: [
            'Designed and implemented multi-agent workflows for automated research, analysis, and review processes using LLM-powered agents',
            'Built context-aware pipelines using Model Context Protocol (MCP) and Semantic Kernel to manage prompt orchestration, memory, and tool usage',
            'Developed agent coordination and state management using Microsoft Orleans for distributed, scalable execution',
            'Integrated AI agents with internal investment management systems to enable real-time data retrieval and decision support'
        ]
    },
    {
        id: 'performance-review',
        images: ['https://image-hosting-api.fly.dev/api/images/6aba4651890a0c16aff3dc10.png'],
        title: 'Performance Review Website',
        start: 'Dec 2024',
        end: 'Sep 2025',
        company: companies.DataArt,
        country: 'UK',
        clientType: 'Investment Management',
        domains: ['hr-enterprise', 'fintech'],
        teamSize: 5,
        summary:
            'Platform for multi-role feedback tracking integrated with internal investment management systems.',
        role: 'Full-Stack Software Engineer',
        tech: ['.NET Core', 'ASP.NET Web API', 'React', 'Azure', 'Terraform', 'OAuth 2.0'],
        responsibilities: [
            'Built end-to-end review workflow with multi-role access and feedback tracking',
            'Troubleshot system issues using Application Insights',
            'Integrated with internal investment management systems',
            'Improved project list rendering by 50% through caching and API optimization'
        ]
    },
    {
        id: 'asset-market-management',
        images: ['https://image-hosting-api.fly.dev/api/images/69fe360cd32fa239a62a5f46.jpg'],
        title: 'Comprehensive Asset Market Management',
        start: 'Sep 2024',
        end: 'Sep 2025',
        company: companies.DataArt,
        country: 'UK',
        clientType: 'Private Equity',
        domains: ['fintech'],
        teamSize: 7,
        summary:
            'Platform to manage projects, funds and companies with meeting agenda tracking for private equity operations.',
        role: 'Full-Stack Software Engineer',
        tech: ['.NET Framework', 'NServiceBus', 'EventStore', 'RavenDB', 'Knockout.js', 'React'],
        responsibilities: [
            'Optimised deployments and Octopus-based processes',
            'Analyzed logs across VMs to extract system insights',
            'Refactored validation models and Razor views',
            'Led sprint planning and technical design sessions'
        ]
    },
    {
        id: 'video-monitoring',
        images: ['https://image-hosting-api.fly.dev/api/images/69fe3613d32fa239a62a5f48.jpg'],
        title: 'Video Monitoring System',
        start: 'May 2024',
        end: 'Aug 2024',
        company: companies.DataArt,
        country: 'AE',
        clientType: 'Security / Surveillance',
        domains: ['security-iot'],
        teamSize: 4,
        summary:
            'Offline-capable system for configuring and monitoring network-connected cameras with role-based permissions.',
        role: 'Backend Software Engineer',
        tech: ['.NET Core', 'ASP.NET Web API', 'MediaMTX', 'Serilog', 'xUnit', 'React Native'],
        responsibilities: [
            'Implemented secure camera configuration logic and local proxy services',
            'Developed and tested HTTP client layer with xUnit',
            'Designed YAML configuration processing service',
            'Managed manual CI/CD deployments to client servers'
        ]
    },
    {
        id: 'vessel-traffic-management',
        images: ['https://image-hosting-api.fly.dev/api/images/69fe3603d32fa239a62a5f44.jpg'],
        title: 'Vessel Traffic Management System (VISSIM)',
        start: 'Aug 2022',
        end: 'Dec 2022',
        company: companies.VectorSoftware,
        country: 'NO',
        clientType: 'Maritime Operations',
        domains: ['maritime'],
        teamSize: 12,
        summary: 'The project was a distributed offshore system comprising multiple interrelated components that allowed consumers to control each element separately and view its coordinates on a world map. This allowed consumers to track vessels in real-time, predict emergencies, detect oil spills, manage ports, track personnel, monitor events on oil rigs, and monitor offshore wind.',
        role: 'Automation QA Engineer',
        tech: ['.NET Core', 'SQL Server', 'NUnit3', 'RestSharp', 'Angular', 'Azure', 'elasticSearch', 'Fidler', 'Postman', 'Test Automation'],
        responsibilities: [
            'Developed automatic tests (Unit, E2E, Integration, UI)',
            'Maintained nightly test runs and fixed failures',
            'Coordinated tasks and refactored code for stability'
        ]
    }
];

export default projects;
