import React from "react";
import IconWrapper from "./IconWrapper";

const VerticalDots = ({
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
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
      </svg>
    </IconWrapper>
  );
};

export default VerticalDots;
