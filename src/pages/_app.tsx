import "@/styles/globals.css";
import type { AppProps } from "next/app";
import HeaderDefault from "@/components/Gnb/Header_default";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeaderDefault />
      <Component {...pageProps} />
    </>
  );
}
