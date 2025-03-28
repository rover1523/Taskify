import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import HeaderDefault from "@/components/gnb/HeaderDefault";
import HeaderDashboard from "@/components/gnb/HeaderDashboard";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = router.pathname;

  // 헤더 숨길 페이지
  const noHeaderRoutes = ["/login", "/signup"];
  const isHeaderHidden =
    (Component as any).hideHeader || noHeaderRoutes.includes(pathname);

  // 상황별 헤더 분기
  const isLandingPage = pathname === "/";
  const isMyPage = pathname === "/mypage";
  const isMyDashboard = pathname === "/mydashboard";
  const isDashboardPage = pathname.startsWith("/dashboard");
  const dashboardId = router.query.dashboardId;

  const renderHeader = () => {
    if (isHeaderHidden) return null;
    if (isLandingPage) return <HeaderDefault variant="black" />;
    if (isMyPage) return <HeaderDashboard variant="mypage" />;
    if (isMyDashboard) return <HeaderDashboard variant="mydashboard" />;
    if (isDashboardPage)
      return <HeaderDashboard variant="dashboard" dashboardId={dashboardId} />;
    return <HeaderDefault />;
  };

  return (
    <>
      {renderHeader()}
      <Component {...pageProps} />
    </>
  );
}
