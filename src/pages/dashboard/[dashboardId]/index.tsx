// index.tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  getColumns,
  getCardsByColumn,
  getDashboards,
  createColumn,
} from "@/api/dashboards";
import {
  CardType,
  ColumnType,
  DashboardType,
  TasksByColumn,
} from "@/types/task";
import { getColumns, getCardsByColumn, getDashboards } from "@/api/dashboards";
import { getMembers } from "@/api/card"; // ✅ card.ts에 정의된 getMembers 함수 사용
import { CardType, ColumnType, TasksByColumn } from "@/types/task";
import HeaderDashboard from "@/components/gnb/HeaderDashboard";
import Column from "@/components/columnCard/Column";
import SideMenu from "@/components/sideMenu/SideMenu";
import ColumnsButton from "@/components/button/ColumnsButton";
import AddColumnModal from "@/components/columnCard/AddColumnModal";

export default function Dashboard() {
  const router = useRouter();
  const { dashboardId } = router.query;
  const teamId = "13-4";
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [tasksByColumn, setTasksByColumn] = useState<TasksByColumn>({});
  const [dashboardList, setDashboardList] = useState<DashboardType[]>([]);

  const teamId = "13-4";

  const [isReady, setIsReady] = useState(false);
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const openModal = () => setIsAddColumnModalOpen(true);
  // 칼럼 이름 유효성 검사용
  const isDuplicate = columns.some(
    (col) => col.title.toLowerCase() === newColumnTitle.trim().toLowerCase()
  );
  const pattern = isDuplicate ? "^$" : ".*\\S.*"; // 어떤 값이든 invalid처리. 공백이 있는 값은 invalid
  const invalidMessage = isDuplicate
    ? "중복된 칼럼 이름입니다."
    : "칼럼 이름을 입력해 주세요.";
  const isTitleEmpty = !newColumnTitle.trim();
  const isMaxColumns = columns.length >= 10;
  const isCreateDisabled = isTitleEmpty || isDuplicate || isMaxColumns;

  // router 준비되었을 때 렌더링
  useEffect(() => {
    if (router.isReady && dashboardId) {
      setIsReady(true);
    }
  }, [router.isReady, dashboardId]);

  // 대시보드 목록 불러오기

  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [tasksByColumn, setTasksByColumn] = useState<TasksByColumn>({});
  const [dashboardList, setDashboardList] = useState<Dashboard[]>([]);
  const [members, setMembers] = useState<{ id: number; name: string }[]>([]);

  // 👉 대시보드 목록 가져오기
  const fetchDashboards = async () => {
    try {
      const res = await getDashboards({ teamId });
      setDashboardList(res.dashboards);
    } catch (error) {
      console.error("대시보드 불러오기 실패:", error);
    }
  };

  // 👉 팀 멤버 목록 가져오기
  const fetchMembers = async () => {
    try {
      if (dashboardId) {
        const res = await getMembers(teamId, Number(dashboardId));
        setMembers(res); // 올바른 데이터 구조로 설정
      }
    } catch (err) {
      console.error("멤버 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    if (router.isReady && dashboardId) {
      setIsReady(true);
    }
  }, [router.isReady, dashboardId]);

  useEffect(() => {
    if (!isReady || !dashboardId) return;

    fetchDashboards();
    fetchMembers(); // ✅ 초기 멤버 로딩
  }, [teamId]);

  useEffect(() => {
    if (!isReady || typeof dashboardId !== "string") return;

    const fetchColumnsAndCards = async () => {
      try {
        const numericDashboardId = Number(dashboardId);

        // 칼럼 목록 조회
        const columnRes = await getColumns({
          teamId,
          dashboardId: numericDashboardId,
        });
        setColumns(columnRes.data);

        // 각 칼럼에 대한 카드 목록 조회
        const columnTasks: { [columnId: number]: CardType[] } = {};

        await Promise.all(
          columnRes.data.map(async (column: ColumnType) => {
            const cardRes = await getCardsByColumn({
              teamId,
              columnId: column.id,
            });
            columnTasks[column.id] = cardRes.cards;
          })
        );

        setTasksByColumn(columnTasks);
      } catch (err) {
        console.error("❌ 칼럼 또는 카드 로딩 에러:", err);
      }
    };

    fetchColumnsAndCards();
  }, [isReady, dashboardId]);

  const openModal = () => setIsAddColumnModalOpen(true);

  if (!isReady) return <div>로딩 중...</div>;

  return (
    <div className="flex overflow-x-auto min-w-fit">
      <SideMenu teamId={teamId} dashboardList={dashboardList} />

      <div className="flex-1">
        <HeaderDashboard dashboardId={dashboardId} />

        <div className="flex gap-4 p-6 overflow-x-auto">
          {/* 각 칼럼 렌더링 */}
          {columns.map((col) => (
            <Column
              key={col.id}
              columnId={col.id}
              title={col.title}
              tasks={tasksByColumn[col.id] || []}
              teamId={teamId}
              dashboardId={Number(dashboardId)}
              teamId={teamId}
              dashboardId={Number(dashboardId)}
              columnId={col.id}
              members={members} // ✅ 실제 멤버 전달
            />
          ))}

          <ColumnsButton onClick={openModal} />

          {/* 칼럼 추가 모달 */}
          {isAddColumnModalOpen && (
            <AddColumnModal
              isOpen={isAddColumnModalOpen}
              onClose={() => setIsAddColumnModalOpen(false)}
              newColumnTitle={newColumnTitle}
              setNewColumnTitle={setNewColumnTitle}
              pattern={pattern}
              invalidMessage={invalidMessage}
              isCreateDisabled={isCreateDisabled}
              onSubmit={async () => {
                if (!newColumnTitle.trim()) {
                  alert("칼럼 이름을 입력해 주세요.");
                  return;
                }

                try {
                  const newColumn = await createColumn({
                    teamId,
                    title: newColumnTitle,
                    dashboardId: Number(dashboardId),
                  });

                  setColumns((prev) => [...prev, newColumn]);
                  setNewColumnTitle("");
                  setIsAddColumnModalOpen(false);
                } catch (error) {
                  console.error("칼럼 생성 실패:", error);
                  alert("칼럼 생성 중 에러가 발생했어요.");
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
