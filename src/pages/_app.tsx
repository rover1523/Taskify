// import "../styles/globals.module.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  console.log("hello");

  return (
    <div>
      hello
      <Component {...pageProps} />
    </div>
  );
}
