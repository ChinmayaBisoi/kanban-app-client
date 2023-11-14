import React from "react";
import Navbar from "../common/Navbar";

const Layout = ({
  children,
  wrapperCss = "",
}: {
  children: React.ReactNode;
  wrapperCss?: string;
}) => {
  return (
    <div className={wrapperCss}>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
