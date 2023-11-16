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
        {isLoggedIn ? (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <p className="whitespace-nowrap">Email</p>
              <p className="">{email} </p>
            </div>
          </div>
        ) : (
          <div className="text-lg">Login to view your profile</div>
        )}
      </main>
    </LayoutWithSideNav>
  );
};

export default ProfilePage;
