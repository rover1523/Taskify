import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { apiRoutes } from "@/api/apiRoutes";
import { getDashboards } from "@/api/dashboards";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import SideMenu from "@/components/sideMenu/SideMenu";
import HeaderDashboard from "@/components/gnb/HeaderDashboard";
import CardButton from "@/components/button/CardButton";
import DashboardAddButton from "@/components/button/DashboardAddButton";
import { PaginationButton } from "@/components/button/PaginationButton";
import InvitedDashBoard from "@/components/table/invited/InvitedDashBoard";
import NewDashboard from "@/components/modal/NewDashboard";
import { Modal } from "@/components/modal/Modal";
import { CustomBtn } from "@/components/button/CustomButton";

import LoadingSpinner from "@/components/common/LoadingSpinner";

interface Dashboard {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

export default function MyDashboardPage() {
  const { user, isInitialized } = useAuthGuard(); // 미인증 접근 시 로그인 페이지 이동
  const teamId = "13-4";
  const [dashboardList, setDashboardList] = useState<Dashboard[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDashboardId, setSelectedDashboardId] = useState<number | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const itemsPerPage = 6;

  const totalPages = Math.ceil((dashboardList.length + 1) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentItems = [
    <DashboardAddButton key="add" onClick={() => setIsModalOpen(true)} />,
    ...dashboardList.map((dashboard) => (
      <CardButton
        key={dashboard.id}
        dashboardId={dashboard.id}
        title={dashboard.title}
        showCrown={dashboard.createdByMe}
        color={dashboard.color}
        isEditMode={isEditMode}
        createdByMe={dashboard.createdByMe}
        onDeleteClick={(id) => {
          setSelectedDashboardId(id);
          setIsDeleteModalOpen(true);
        }}
      />
    )),
  ].slice(startIndex, startIndex + itemsPerPage);

  const fetchDashboards = async () => {
    try {
      const res = await getDashboards({ teamId });
      setDashboardList(res.dashboards);
    } catch (error) {
      console.error("대시보드 불러오기 실패:", error);
    }
  };
  // 유저 정보 복원된 상태 & 로그인 상태일 때만 api 호출 실행
  useEffect(() => {
    if (isInitialized && user) {
      fetchDashboards();
    }
  }, [isInitialized, user]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleDelete = async () => {
    if (!selectedDashboardId) return;
    try {
      await axiosInstance.delete(
        apiRoutes.DashboardDetail(selectedDashboardId)
      );
      setIsDeleteModalOpen(false);
      setSelectedDashboardId(null); // 선택 초기화
      fetchDashboards(); // 목록 갱신
    } catch (error) {
      alert("대시보드 삭제에 실패했습니다.");
      console.error("삭제 실패:", error);
    }
  };

  if (!isInitialized || !user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <SideMenu teamId={teamId} dashboardList={dashboardList} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <HeaderDashboard
          variant="mydashboard"
          isEditMode={isEditMode}
          onToggleEditMode={() => setIsEditMode((prev) => !prev)}
        />

        <main className="flex-1 overflow-auto px-[25px] pt-[40px] pb-10 bg-[#f9f9f9] space-y-10">
          {/* 대시보드 카드 + 페이지네이션 */}
          <section className="flex flex-col items-start space-y-6">
            <div className="flex flex-wrap gap-x-[20px] gap-y-[16px] w-full max-w-[1100px]">
              {currentItems}
            </div>

            {totalPages > 1 && (
              <div className="justify-end flex items-center w-full max-w-[1035px]">
                <span className="text-sm text-gray-500">
                  {`${currentPage}페이지 중 ${totalPages}`}
                </span>
                <PaginationButton
                  direction="left"
                  disabled={currentPage === 1}
                  onClick={handlePrevPage}
                />
                <PaginationButton
                  direction="right"
                  disabled={currentPage === totalPages}
                  onClick={handleNextPage}
                />
              </div>
            )}
          </section>

          <div className="mt-[74px] flex justify-start">
            <InvitedDashBoard />
          </div>
        </main>
      </div>

      {/* 새로운 대시보드 모달 */}
      {isModalOpen && (
        <NewDashboard
          onClose={() => {
            setIsModalOpen(false);
            fetchDashboards(); // 생성 후 목록 새로고침
          }}
        />
      )}

      <Modal
        width="w-[260px]"
        height="h-[150px]"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        className="flex items-center justify-center text-center"
      >
        <p className="text-black3 font-16m">대시보드를 삭제하시겠습니까?</p>
        <div className="flex items-center justify-center gap-2">
          <CustomBtn
            onClick={handleDelete}
            className="w-[80px] h-[35px] bg-[var(--primary)] font-16m text-white rounded-[8px] cursor-pointer"
          >
            확인
          </CustomBtn>
          <CustomBtn
            onClick={() => setIsDeleteModalOpen(false)}
            className="w-[80px] h-[35px] bg-white font-16m text-[var(--primary)] border-2 border-[var(--primary)] rounded-[8px] cursor-pointer hover:bg-[var(--color-violet8)]"
          >
            취소
          </CustomBtn>
        </div>
      </Modal>
    </div>
  );
}
