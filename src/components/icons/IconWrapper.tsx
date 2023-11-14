import React from "react";

const IconWrapper = ({
  children,
  wrapperCss = "",
  onClick = () => {},
}: {
  children: React.ReactNode;
  wrapperCss?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-1 hover:bg-slate-200 rounded-md cursor-pointer ${wrapperCss}`}
    >
      {children}
    </div>
  );
};

export default IconWrapper;
