import React from "react";

const Overlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed h-screen w-screen inset-0 z-[100] bg-background/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
      {children}
    </div>
  );
};

export default Overlay;
