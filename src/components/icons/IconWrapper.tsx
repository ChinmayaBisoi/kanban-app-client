import React from "react";

const IconWrapper = ({
  children,
  wrapperCss = "",
}: {
  children: React.ReactNode;
  wrapperCss?: string;
}) => {
  return (
    <div
      className={`p-1 hover:bg-slate-200 rounded-md cursor-pointer ${wrapperCss}`}
    >
      {children}
    </div>
  );
};

export default IconWrapper;
