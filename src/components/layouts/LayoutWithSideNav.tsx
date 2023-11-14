import React from "react";
import Layout from "./Layout";
import Link from "next/link";
import { useRouter } from "next/router";

const URLS = [
  { label: "Home", href: "/" },
  { label: "Settings", href: "/settings" },
];

const LayoutWithSideNav = ({
  children,
  childrenCss = "",
}: {
  children: React.ReactNode;
  childrenCss?: string;
}) => {
  const { pathname } = useRouter();

  return (
    <Layout>
      <div className="flex gap-2">
        <aside className="w-52 hidden md:flex flex-col fixed gap-4 text-center p-4">
          {URLS.map(({ label, href }) => (
            <Link
              href={href}
              className={`font-medium py-2 rounded-md ${
                pathname === href ? "bg-gray-100" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </aside>
        <div className={`md:ml-52 ${childrenCss}`}>{children}</div>
      </div>
    </Layout>
  );
};

export default LayoutWithSideNav;
