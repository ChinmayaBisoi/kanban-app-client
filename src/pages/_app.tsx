import { Toaster } from "@/components/ui/toaster";
import { LoginStateProvider } from "@/context/login-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Kanban App</title>
      </Head>
      <LoginStateProvider>
        <Component {...pageProps} className={poppins.className} />
      </LoginStateProvider>
      <Toaster />
    </div>
  );
}
