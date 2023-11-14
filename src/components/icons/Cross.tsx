import React from "react";
import IconWrapper from "./IconWrapper";

const Cross = ({
  iconCss = "",
  wrapperCss = "hover:bg-white",
  onClick = () => {},
}: {
  iconCss?: string;
  wrapperCss?: string;
  onClick?: () => void;
}) => {
  return (
    <IconWrapper onClick={onClick} wrapperCss={wrapperCss}>
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
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </IconWrapper>
  );
};

export default Cross;
