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
import { DeleteModal } from "@/components/modal/DeleteModal";
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
  const { user, isInitialized } = useAuthGuard();
  const teamId = "13-4";
  const [dashboardList, setDashboardList] = useState<Dashboard[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDashboardId, setSelectedDashboardId] = useState<number | null>(
    null
  );
  const [selectedCreatedByMe, setSelectedCreatedByMe] = useState<
    boolean | null
  >(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
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
          setSelectedCreatedByMe(true);
          setSelectedTitle(dashboard.title);
          setIsDeleteModalOpen(true);
        }}
        onLeaveClick={(id) => {
          setSelectedDashboardId(id);
          setSelectedCreatedByMe(false);
          setSelectedTitle(dashboard.title);
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
      setSelectedDashboardId(null);
      fetchDashboards();
    } catch (error) {
      alert("대시보드 삭제에 실패했습니다.");
      console.error("삭제 실패:", error);
    }
  };

  const handleLeave = () => {
    if (!selectedDashboardId) return;
    setDashboardList((prev) =>
      prev.filter((d) => d.id !== selectedDashboardId)
    );
    setIsDeleteModalOpen(false);
    setSelectedDashboardId(null);
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
          <section className="w-full max-w-[1100px] mx-auto">
            {/* 카드 영역 */}
            <div className="flex flex-wrap gap-[16px] justify-center">
              {currentItems}
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center pt-6">
                <PaginationButton
                  direction="left"
                  disabled={currentPage === 1}
                  onClick={handlePrevPage}
                />
                <span className="font-14r text-black3 px-[8px] whitespace-nowrap">
                  {`${totalPages} 페이지 중 ${currentPage}`}
                </span>
                <PaginationButton
                  direction="right"
                  disabled={currentPage === totalPages}
                  onClick={handleNextPage}
                />
              </div>
            )}
          </section>

          {/* 초대받은 대시보드 */}
          <div className="mt-[74px] flex justify-center">
            <InvitedDashBoard />
          </div>
        </main>
      </div>

      {isModalOpen && (
        <NewDashboard
          onClose={() => {
            setIsModalOpen(false);
            fetchDashboards();
          }}
        />
      )}

      {/*관리 모드에서 삭제 버튼 클릭 시 모달 오픈*/}
      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        isConfirmDeleteModalOpen={isConfirmDeleteModalOpen}
        setIsConfirmDeleteModalOpen={setIsConfirmDeleteModalOpen}
        selectedTitle={selectedTitle}
        selectedCreatedByMe={selectedCreatedByMe}
        handleDelete={handleDelete}
        handleLeave={handleLeave}
      />
    </div>
  );
}
