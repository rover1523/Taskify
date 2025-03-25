<<<<<<< HEAD
import React from "react";
import HeaderMyPage from "@/components/Gnb/HeaderMypage";
import SideMenu from "@/components/SideMenu/SideMenu";
import ProfileCard from "@/components/card/Profile";
import ChangePassword from "@/components/card/ChangePassword";

export default function MyPage() {
  return (
    <div className="flex">
      <SideMenu dashboardList={[]} />
      <div className="flex flex-col w-full">
        <HeaderMyPage />
        <div className="flex flex-col items-center w-full mt-10">
          <ProfileCard />
          <ChangePassword />
        </div>
      </div>
=======
import { useRouter } from "next/router";

export default function EditDashboard() {
  const router = useRouter();

  return (
    <div>
      <h1>마이페이지 </h1>
>>>>>>> 5e01c5638c571a4057ba43e442cc95da8102aca5
    </div>
  );
}
