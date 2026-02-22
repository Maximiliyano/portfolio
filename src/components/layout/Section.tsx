export const Section = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <section className={className || 'px-4 mt-16 mb-16 max-w-4xl mx-auto'}>
      {children}
    </section>
  );
}