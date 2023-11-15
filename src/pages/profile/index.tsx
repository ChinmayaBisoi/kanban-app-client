import LayoutWithSideNav from "@/components/layouts/LayoutWithSideNav";
import { useLoginState } from "@/context/login-context";
import Link from "next/link";
import React from "react";

const ProfilePage = () => {
  const { isLoggedIn, email } = useLoginState();
  return (
    <LayoutWithSideNav childrenCss="px-4 py-8 w-full">
      <main className="flex flex-col gap-4 md:gap-8">
        <div className="flex xs:flex-row flex-col xs:items-center xs:justify-between gap-x-4 gap-y-2 mb-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold">Profile</h1>
            <h3 className="text-gray-500">View and manage your profile.</h3>
          </div>
        </div>
        <div className="flex flex-col gap-4">
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
        </div>
      </main>
    </LayoutWithSideNav>
  );
};

export default ProfilePage;
