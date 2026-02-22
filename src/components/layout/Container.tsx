export const Container = ({ children, id, className }: { id?: string, className?: string, children: React.ReactNode }) => {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
}
