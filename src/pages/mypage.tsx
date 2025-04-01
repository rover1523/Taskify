import React, { useState, useEffect } from "react";
import HeaderMyPage from "@/components/gnb/HeaderDashboard";
import SideMenu from "@/components/sideMenu/SideMenu";
import ProfileCard from "@/components/card/Profile";
import ChangePassword from "@/components/card/ChangePassword";
import { getDashboards } from "@/api/dashboards";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function MyPage() {
  const teamId = "13-4";
  const { user, isInitialized } = useAuthGuard();
  const [dashboards, setDashboards] = useState([]);

  const fetchDashboards = async () => {
    try {
      const res = await getDashboards({ teamId });
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

  return (
    <div className="flex">
      <SideMenu teamId={teamId} dashboardList={dashboards} />
      <div className="flex flex-col w-full">
        <HeaderMyPage variant="mypage" />
        <div className="flex flex-col justify-start w-full mt-10">
          <ProfileCard />
          <ChangePassword />
        </div>
      </div>
    </div>
  );
}
