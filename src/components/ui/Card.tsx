import type React from "react";

export const Card = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="bg-surface p-6 rounded-2xl shadow-lg">
      {children}
    </div>
  );
}