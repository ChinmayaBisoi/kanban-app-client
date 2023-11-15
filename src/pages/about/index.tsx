import LayoutWithSideNav from "@/components/layouts/LayoutWithSideNav";
import { useLoginState } from "@/context/login-context";
import Link from "next/link";
import React from "react";

const AboutPage = () => {
  const { isLoggedIn, email } = useLoginState();
  return (
    <LayoutWithSideNav childrenCss="px-4 py-8 w-full">
      <main className="flex flex-col gap-4 md:gap-8">
        <div className="flex items-center gap-2 font-semibold">
          <p className="text-4xl">Developer</p>
          {/* <Heart width="28" height="28" /> */}
        </div>
        <div className="flex flex-col">
          <p className="whitespace-nowrap">Email</p>
          <Link
            className="text-blue-500"
            href={"mailto: bisoi.chinmaya.1999@gmail.com"}
          >
            bisoi.chinmaya.1999@gmail.com
          </Link>
        </div>
        <div className="flex flex-col">
          <p className="whitespace-nowrap">Github</p>
          <Link
            className="text-blue-500"
            href={"https://github.com/ChinmayaBisoi/kanban-app-client"}
          >
            https://github.com/ChinmayaBisoi/kanban-app-client
          </Link>
        </div>
        <div className="flex items-center gap-1 whitespace-nowrap">
          {/* <Copyright width="16" height="16" className="min-w-[16px]" /> */}
          <p>2023 Chinmaya Bisoi</p>
        </div>
      </main>
    </LayoutWithSideNav>
  );
};

export default AboutPage;
