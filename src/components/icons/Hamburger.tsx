import React from "react";
import IconWrapper from "./IconWrapper";

const Hamburger = ({
  iconCss = "",
  wrapperCss = "hover:bg-white",
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
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    </IconWrapper>
  );
};

export default Hamburger;
