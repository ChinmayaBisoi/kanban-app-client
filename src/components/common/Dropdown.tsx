import { useOnOutsideClick } from "@/hooks/useOnOutsideClick";
import React, { useRef } from "react";

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
          className={`absolute bg-white border border-gray-300 rounded-md p-1 w-20 h-20 ${wrapperCss}`}
        >
          {children}
        </div>
      ) : null}
    </>
  );
};

export default Dropdown;
