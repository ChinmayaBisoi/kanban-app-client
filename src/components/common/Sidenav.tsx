import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const URLS = [
  { label: "Home", href: "/" },
  { label: "Settings", href: "/settings" },
];

const Sidenav = ({ isMob = false }: { isMob?: boolean }) => {
  const { pathname } = useRouter();
  return (
    <aside
      className={`w-52 mt-4 ${
        isMob ? "flex" : "hidden md:flex"
      }  flex-col fixed gap-4 text-center p-4`}
    >
      {URLS.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={`font-medium py-2 rounded-md ${
            pathname === href ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          {label}
        </Link>
      ))}
    </aside>
  );
};

export default Sidenav;
