import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="font-24b text-[var(--primary)]">404 Not Found</h1>
      <p className="mt-1 font-16r text-black3">페이지를 찾을 수 없습니다.</p>
      <p className="mt-1 font-16r text-black3">5초 후 홈페이지로 이동합니다.</p>
    </div>
  );
}
