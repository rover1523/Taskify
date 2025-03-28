import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getColumns, getCardsByColumn, getDashboards } from "@/api/dashboard";
import { getMembers } from "@/api/card"; // ✅ card.ts에 정의된 getMembers 함수 사용
import { CardType, ColumnType, TasksByColumn } from "@/types/task";
import HeaderBebridge from "@/components/gnb/HeaderBebridge";
import Column from "@/components/columncard/Column";
import SideMenu from "@/components/sideMenu/SideMenu";
import ColumnsButton from "@/components/button/ColumnsButton";
import { Modal } from "@/components/modal/Modal";
import Input from "@/components/input/Input";
import { CustomBtn } from "@/components/button/CustomBtn";

export default function Dashboard() {
  const router = useRouter();
  const { dashboardId } = router.query;
  const teamId = "13-4";

  const [isReady, setIsReady] = useState(false);
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);

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
    fetchDashboards();
    fetchMembers(); // ✅ 초기 멤버 로딩
  }, [teamId]);

  useEffect(() => {
    if (!isReady || typeof dashboardId !== "string") return;

    const fetchColumnsAndCards = async () => {
      try {
        const columnRes = await getColumns({ teamId, dashboardId });
        setColumns(columnRes.data);

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
        console.error("❌ 에러 발생:", err);
      }
    };

    fetchColumnsAndCards();
  }, [isReady, dashboardId]);

  const openModal = () => setIsAddColumnModalOpen(true);

  if (!isReady) return <div>로딩 중...</div>;

  return (
    <div className="flex">
      <SideMenu teamId={teamId} dashboardList={dashboardList} />

      <div className="flex-1">
        <HeaderBebridge dashboardId={dashboardId} />

        <div className="flex gap-4 p-6">
          {columns.map((col) => (
            <Column
              key={col.id}
              title={col.title}
              tasks={tasksByColumn[col.id] || []}
              teamId={teamId}
              dashboardId={Number(dashboardId)}
              columnId={col.id}
              members={members} // ✅ 실제 멤버 전달
            />
          ))}

          <ColumnsButton onClick={openModal} />

          {isAddColumnModalOpen && (
            <Modal
              isOpen={isAddColumnModalOpen}
              onClose={() => setIsAddColumnModalOpen(false)}
            >
              <div className="flex flex-col gap-5">
                <h2 className="text-2xl font-bold">새 칼럼 생성</h2>

                <label className="font-medium flex flex-col gap-2">
                  이름
                  <Input type="text" placeholder="새로운 프로젝트" />
                </label>
                <div className="flex justify-between mt-1.5">
                  <CustomBtn
                    variant="outlineDisabled"
                    onClick={() => {
                      setIsAddColumnModalOpen(false);
                    }}
                  >
                    취소
                  </CustomBtn>
                  <CustomBtn>생성</CustomBtn>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}
