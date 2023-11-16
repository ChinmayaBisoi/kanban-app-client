import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import {
  LoginStateProvider,
  useLoginState,
  useLoginStateDispatch,
} from "@/context/login-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";
import { useEffect } from "react";
import checkAuth from "./api/auth/check-auth";
import React from "react";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

function Wrapper({ Component, pageProps }: AppProps) {
  const { toast } = useToast();
  const { isLoggedIn } = useLoginState();
  const loginStateDispatch = useLoginStateDispatch();

  async function tryToLogin() {
    if (isLoggedIn) return;
    await checkAuth()
      .then((res) => {
        if (res.ok) {
          loginStateDispatch({
            type: "login",
            email: res.userInfo.email,
            userId: res.userInfo.id,
          });
          toast({
            title: "Auto Login successfull",
          });
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    tryToLogin();
  }, [isLoggedIn]);

  return (
    <div id="wrapper">
      <Head>
        <title>Kanban App</title>
      </Head>
      <Component {...pageProps} className={poppins.className} />
    </div>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Kanban App</title>
      </Head>
      <LoginStateProvider>
        <Wrapper
          {...pageProps}
          Component={Component}
          className={poppins.className}
        />
      </LoginStateProvider>
      <Toaster />
    </div>
  );
}
