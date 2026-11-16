import { ContactLinks } from "../components/ui/ContactLinks";
import site from "../data/site";

export const Footer = () => {
    return (
        <footer
            className="fixed bottom-0 left-0 w-full flex items-center justify-center z-50"
            style={{ backgroundColor: 'var(--surface)', color: 'var(--text)', borderTop: '1px solid var(--border)' }}
        >
            <div className="w-full max-w-6xl px-4 py-2 flex items-center justify-between">
                <p className="text-xs text-[var(--muted)] hidden sm:block">© 2026 {site.name}</p>
                <div className="sm:hidden w-full flex justify-center">
                    <ContactLinks iconSize="lg" />
                </div>
                <div className="hidden sm:block">
                    <ContactLinks showLabel={true} />
                </div>
            </div>
        </footer>
    );
};
