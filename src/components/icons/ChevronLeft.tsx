import React from "react";
import IconWrapper from "./IconWrapper";

const ChevronLeft = ({
  iconCss = "",
  wrapperCss = "hover:bg-transparent",
}: {
  iconCss?: string;
  wrapperCss?: string;
}) => {
  return (
    <IconWrapper wrapperCss={wrapperCss}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={iconCss}
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </IconWrapper>
  );
};

export default ChevronLeft;
