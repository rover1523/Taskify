import "@/styles/globals.css";
import type { AppProps } from "next/app";
import HeaderDefault from "@/components/Gnb/Header_default";
import HeaderDefaultBk from "@/components/Gnb/Header_default_bk";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeaderDefault />
      <HeaderDefaultBk />
      <Component {...pageProps} />
    </>
  );
}
