import React, { useState, useEffect } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import HeaderMyPage from "@/components/gnb/HeaderDashboard";
import SideMenu from "@/components/sideMenu/SideMenu";
import ProfileCard from "@/components/card/Profile";
import ChangePassword from "@/components/card/ChangePassword";
import { Dashboard, getDashboards } from "@/api/dashboards";
import { TEAM_ID } from "@/constants/team";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function MyPage() {
  const { user, isInitialized } = useAuthGuard();
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);

  const fetchDashboards = async () => {
    try {
      const res = await getDashboards({});
      setDashboards(res.dashboards); // 👉 정상 저장
    } catch (error) {
      console.error("대시보드 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    if (isInitialized && user) {
      fetchDashboards();
    }
  }, [isInitialized, user]);

  if (!isInitialized || !user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex">
      <SideMenu teamId={TEAM_ID} dashboardList={dashboards} />
      <div className="flex flex-col w-full bg-[var(--color-gray5)]">
        <HeaderMyPage variant="mypage" />
        <div className="flex flex-col justify-start w-full mt-10">
          <ProfileCard />
          <ChangePassword />
        </div>
      </div>
    </div>
  );
}
