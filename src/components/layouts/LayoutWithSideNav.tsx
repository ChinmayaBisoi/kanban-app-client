import React from "react";
import Layout from "./Layout";
import Sidenav from "../common/Sidenav";

const LayoutWithSideNav = ({
  children,
  childrenCss = "",
}: {
  children: React.ReactNode;
  childrenCss?: string;
}) => {
  return (
    <Layout>
      <div className="flex gap-2">
        <Sidenav />
        <div className={`md:ml-52 ${childrenCss}`}>{children}</div>
      </div>
    </Layout>
  );
};

export default LayoutWithSideNav;
