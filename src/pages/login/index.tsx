import ChevronLeft from "@/components/icons/ChevronLeft";
import EyeClose from "@/components/icons/EyeClose";
import EyeOpen from "@/components/icons/EyeOpen";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function isValidLoginRequest() {
    if (!email) {
      return "Email is a required field !";
    } else if (!password) {
      return "Password is a required field !";
    }
  }

  function handleLogin() {
    const errMsg = isValidLoginRequest();
    if (errMsg) {
      toast({ title: errMsg, variant: "destructive" });
      return;
    }

    // call login api here
  }
  return (
    <div className="h-screen w-screen p-8">
      <Button variant="outline" className="flex gap-1">
        <ChevronLeft />
        <span>Back</span>
      </Button>
      <div className="mt-20 flex items-center justify-center ">
        <div className="w-fit shadow-xl rounded-lg flex flex-col gap-4 p-8 pt-4 px-10">
          <div className="flex flex-col">
            <label htmlFor="email" className="w-20">
              Email
            </label>
            <div className="border p-1 px-3 border-gray-300 rounded-md">
              <input
                type=""
                className="outline-none w-full"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="w-20">
              Password
            </label>
            <div className="border flex border-gray-300 rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                className="outline-none w-full mx-3"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {showPassword ? (
                <EyeOpen
                  onClick={() => {
                    setShowPassword(false);
                  }}
                  wrapperCss="hover:bg-gray-200 h-full rounded-l-none"
                />
              ) : (
                <EyeClose
                  onClick={() => {
                    setShowPassword(true);
                  }}
                  wrapperCss="hover:bg-gray-200 h-full rounded-l-none"
                />
              )}
            </div>
          </div>
          <div className="flex gap-3 text-sm">
            <p>Dont have an acccount?</p>{" "}
            <Link href="/register" className="underline">
              Register
            </Link>
          </div>
          <Button onClick={handleLogin}>Login</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
