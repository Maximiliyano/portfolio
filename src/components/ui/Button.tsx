export const Button = ({ children }: { children: React.ReactNode }) => {
    return (
        <button
            className="px-6 py-3 bg-blue-300 rounded-xl hover:scale-105 transition"
        >
            {children}
        </button>
    );
}