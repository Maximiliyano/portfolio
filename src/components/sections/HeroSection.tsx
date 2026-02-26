import site from '../../data/site';
import photo from '../../assets/photo.jpg';
import { Container } from '../layout/Container';
import { ContactLinks } from '../ui/ContactLinks';
import ResumeButton from '../ui/ResumeButton';

export const HeroSection = () => (
    <Container id="hero" className="flex flex-col sm:flex-row items-stretch gap-6 border-b border-gray-200 dark:border-slate-700 py-6">
        <div className="shrink-0 mx-auto sm:mx-0">
            <img
                src={photo}
                loading="lazy"
                alt={site.name}
                className="w-36 sm:w-48 h-full object-cover rounded-xl border border-gray-200 dark:border-slate-600 shadow-md"
            />
        </div>
        <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">{site.name}</h1>
            <div className="mt-1.5 mb-3">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full ${site.openToOpportunities ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300' : 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${site.openToOpportunities ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    {site.openToOpportunities ? 'Open to opportunities' : 'Not in active search'}
                </span>
            </div>
            <p className="text-base text-gray-600 dark:text-gray-400">{site.title} · {site.location}</p>
            <p className="mt-2 mb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{site.coverletter}</p>
            <div className="mb-4">
                <ContactLinks variant="block" />
            </div>
            <ResumeButton />
        </div>
    </Container>
);
