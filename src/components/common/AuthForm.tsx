import ChevronLeft from "@/components/icons/ChevronLeft";
import EyeClose from "@/components/icons/EyeClose";
import EyeOpen from "@/components/icons/EyeOpen";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import React, { useState } from "react";

const AuthForm = ({ isRegisterForm = false }: { isRegisterForm?: boolean }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function isValidRequest() {
    if (!email) {
      return "Email is a required field !";
    } else if (!password) {
      return "Password is a required field !";
    } else if (isRegisterForm && password !== confirmPassword) {
      return "Passwords do not match !";
    }
  }

  function hanldeFormSubmission() {
    const errMsg = isValidRequest();
    if (errMsg) {
      toast({ title: errMsg, variant: "destructive" });
      return;
    }

    // call register api here
  }
  return (
    <div className="h-screen w-screen p-8">
      <Link href="/">
        <Button variant="outline" className="flex gap-1">
          <ChevronLeft />
          <span>Back</span>
        </Button>
      </Link>
      <div className="mt-20 flex items-center justify-center ">
        <div className="w-fit shadow-xl rounded-lg flex flex-col gap-4 p-10 px-20">
          <div className="flex flex-col">
            <label htmlFor="email" className="">
              Email
            </label>
            <div className="border p-1 px-3 border-gray-300 rounded-md">
              <input
                type=""
                className="outline-none w-full"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="">
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
          {isRegisterForm && (
            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="">
                Confirm Password
              </label>
              <div className="border flex border-gray-300 rounded-md">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="outline-none w-full mx-3"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                {showPassword ? (
                  <EyeOpen
                    onClick={() => {
                      setShowConfirmPassword(false);
                    }}
                    wrapperCss="hover:bg-gray-200 h-full rounded-l-none"
                  />
                ) : (
                  <EyeClose
                    onClick={() => {
                      setShowConfirmPassword(true);
                    }}
                    wrapperCss="hover:bg-gray-200 h-full rounded-l-none"
                  />
                )}
              </div>
            </div>
          )}

          <div className="flex gap-3 text-sm">
            <p>
              {isRegisterForm
                ? "Already have an acccount ?"
                : "Dont have an account ?"}
            </p>
            <Link
              href={isRegisterForm ? "/login" : "/register"}
              className="underline"
            >
              {isRegisterForm ? "Login" : "Register"}
            </Link>
          </div>
          <Button onClick={hanldeFormSubmission}>Register</Button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
