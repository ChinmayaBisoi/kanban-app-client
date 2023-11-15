import React from "react";

const Dropdown = ({
  show = false,
  close = () => {},
  wrapperCss = "",
  children,
}: {
  show: boolean;
  close: () => void;
  wrapperCss?: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      {show ? (
        <div
          className={`absolute z-10 bg-white border border-gray-300 rounded-md p-1 ${wrapperCss}`}
        >
          {children}
        </div>
      ) : null}
    </>
  );
};

export default Dropdown;
