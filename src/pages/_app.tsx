import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@/components/Gnb/Header_default";
import HeaderDefault from "@/components/Gnb/Header_default";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeaderDefault />
      <Component {...pageProps} />
    </>
  );
}
