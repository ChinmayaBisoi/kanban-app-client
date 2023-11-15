import ChevronLeft from "@/components/icons/ChevronLeft";
import EyeClose from "@/components/icons/EyeClose";
import EyeOpen from "@/components/icons/EyeOpen";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useLoginStateDispatch } from "@/context/login-context";
import login from "@/pages/api/auth/login";
import register from "@/pages/api/auth/register";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const AuthForm = ({ isRegisterForm = false }: { isRegisterForm?: boolean }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginStateDispatch = useLoginStateDispatch();
  const router = useRouter();

  function isValidRequest() {
    if (!email) {
      return "Email is a required field !";
    } else if (!password) {
      return "Password is a required field !";
    } else if (isRegisterForm && password !== confirmPassword) {
      return "Passwords do not match !";
    }
  }

  async function handleRegister() {
    setLoading(true);

    await register({ email, password })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          toast({
            title: "Registration success!",
            description: "Please login now!",
          });
          router.push("/login");
        } else {
          toast({
            title: "Unexpected error",
            description: res.message,
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error trying to register",
          description: err,
          variant: "destructive",
        });
      });
    setLoading(false);
  }

  async function handleLogin() {
    setLoading(true);
    await login({ email, password })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          toast({
            title: "Logged in successfully",
            description: "",
          });
          loginStateDispatch({
            type: "login",
            email: res.email,
            userId: res.userId,
          });
          router.push("/");
        } else {
          toast({
            title: "Unexpected error",
            description: res.message,
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error trying to log in",
          description: err,
          variant: "destructive",
        });
      });
    setLoading(false);
  }

  function hanldeFormSubmission() {
    const errMsg = isValidRequest();
    if (errMsg) {
      toast({ title: errMsg, variant: "destructive" });
      return;
    }

    if (isRegisterForm) {
      handleRegister();
    } else {
      handleLogin();
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
          <Button loading={loading} onClick={hanldeFormSubmission}>
            {isRegisterForm ? "Register" : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
