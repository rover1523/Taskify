import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useUserStore from "@/store/useUserStore";
import HeaderDefault from "@/components/gnb/HeaderDefault";
import { getUserInfo } from "@/api/user";
import { TEAM_ID } from "@/constants/team";

// 토큰 만료 설정
function isTokenExpired() {
  const expiresAt = localStorage.getItem("expiresAt");
  if (!expiresAt) return true;
  return new Date().getTime() > parseInt(expiresAt, 10);
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token && !isTokenExpired()) {
        try {
          const userData = await getUserInfo({ teamId: TEAM_ID });
          useUserStore.getState().setUser(userData);
        } catch {
          useUserStore.getState().clearUser();
        }
      } else {
        useUserStore.getState().clearUser();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("expiresAt");
      }
    };

    initializeUser();
  }, []);

  const router = useRouter();
  const pathname = router.pathname;

  const isDashboardPage = pathname.startsWith("/dashboard");
  // 헤더 숨길 페이지
  const noHeaderRoutes = ["/login", "/signup", "/mydashboard", "/mypage"];
  const isHeaderHidden =
    (Component as any).hideHeader ||
    noHeaderRoutes.includes(pathname) ||
    isDashboardPage;

  // 상황별 헤더 분기
  const isLandingPage = pathname === "/";

  const renderHeader = () => {
    if (isHeaderHidden) return null;
    if (isLandingPage) return <HeaderDefault variant="black" />;
    return <HeaderDefault />;
  };

  return (
    <>
      {renderHeader()}
      <Component {...pageProps} />
    </>
  );
}
