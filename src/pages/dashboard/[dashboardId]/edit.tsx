import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ChangeBebridge from "@/components/modal/ChangeBebridge";
import HeaderBebridge from "@/components/Gnb/HeaderBebridge";
import MemberList from "@/components/table/member/MemberList";
import SideMenu from "@/components/SideMenu/SideMenu";
import InviteRecords from "@/components/table/InviteRecords";

export default function EditDashboard() {
  const router = useRouter();
  const { dashboardId } = router.query;
  const [isReady, setIsReady] = useState(false);

  const dashboardList = [
    {
      id: 1,
      title: "비브리지",
      color: "#7AC555",
      createdAt: "2024-01-26T05:42:12.264Z",
      updatedAt: "2024-01-26T05:42:12.264Z",
      createdByMe: true,
      userId: 10,
    },
    {
      id: 2,
      title: "코드잇",
      color: "#760DDE",
      createdAt: "2024-01-26T05:42:12.264Z",
      updatedAt: "2024-01-26T05:42:12.264Z",
      createdByMe: true,
      userId: 10,
    },
    {
      id: 3,
      title: "3분기 계획",
      color: "#FFA500",
      createdAt: "2024-01-26T05:42:12.264Z",
      updatedAt: "2024-01-26T05:42:12.264Z",
      createdByMe: false,
      userId: 11,
    },
  ];

  return (
    <div className="flex h-screen ">
      <SideMenu dashboardList={dashboardList} />

      <div className="flex flex-col flex-1">
        {/* HeaderBebridge와 ChangeBebridge는 상단에 배치 */}
        <div className="flex flex-col">
          <HeaderBebridge dashboardId={dashboardId} />
        </div>
        <div className="mt-8 ml-4">
          <ChangeBebridge />
        </div>

        {/* MemberList는 아래쪽에 배치 */}
        <div className="ml-4">
          <MemberList dashboardId={dashboardId} />
        </div>

        <div className="ml-4">
          <InviteRecords />
        </div>
      </div>
    </div>
  );
}
