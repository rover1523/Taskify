// index.tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  getColumns,
  getCardsByColumn,
  getDashboards,
  createColumn,
} from "@/api/dashboard";
import {
  CardType,
  ColumnType,
  DashboardType,
  TasksByColumn,
} from "@/types/task";
import HeaderBebridge from "@/components/gnb/HeaderBebridge";
import Column from "@/components/columnCard/Column";
import SideMenu from "@/components/sideMenu/SideMenu";
import ColumnsButton from "@/components/button/ColumnsButton";
import { Modal } from "@/components/modal/Modal";
import Input from "@/components/input/Input";
import { CustomBtn } from "@/components/button/CustomBtn";

export default function Dashboard() {
  const router = useRouter();
  const { dashboardId } = router.query;
  const teamId = "13-4";
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [tasksByColumn, setTasksByColumn] = useState<TasksByColumn>({});
  const [dashboardList, setDashboardList] = useState<DashboardType[]>([]);

  const [isReady, setIsReady] = useState(false);
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
  const openModal = () => setIsAddColumnModalOpen(true);
  // const closeModal = () => setIsAddColumnModalOpen(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  // 칼럼 중복 체크
  const isDuplicate = columns.some(
    (col) => col.title.toLowerCase() === newColumnTitle.trim().toLowerCase()
  );
  //정규식 패턴: 중복이면 무효한 값이 되게끔
  const pattern = isDuplicate ? "^$" : ".*\\S.*"; // 어떤 값이든 invalid처리. 공백이 있는 값은 invalid
  // 경고 메시지 설정
  const invalidMessage = isDuplicate
    ? "중복된 칼럼 이름입니다."
    : "칼럼 이름을 입력해 주세요.";
  // 버튼 활성화 조건
  const isTitleEmpty = !newColumnTitle.trim();
  const isMaxColumns = columns.length >= 10;
  const isCreateDisabled = isTitleEmpty || isDuplicate || isMaxColumns;

  // router 준비되었을 때 렌더링
  useEffect(() => {
    if (router.isReady && dashboardId) {
      setIsReady(true);
    }
  }, [router.isReady, dashboardId]);

  const fetchDashboards = async () => {
    try {
      const res = await getDashboards({ teamId });
      setDashboardList(res.dashboards);
    } catch (error) {
      console.error("대시보드 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchDashboards();
  }, [teamId]);
  <SideMenu teamId={teamId} dashboardList={dashboardList} />;
  // 칼럼 + 카드 로딩
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

  if (!isReady) return <div>로딩 중...</div>;

  return (
    <div className="flex overflow-x-auto min-w-fit">
      <SideMenu teamId={teamId} dashboardList={dashboardList} />

      <div className="flex-1">
        <HeaderBebridge dashboardId={dashboardId} />

        <div className="flex gap-4 p-6 overflow-x-auto">
          {columns.map((col) => (
            <Column
              key={col.id}
              title={col.title}
              tasks={tasksByColumn[col.id] || []}
              teamId={teamId}
              dashboardId={dashboardId}
            />
          ))}

          <ColumnsButton onClick={openModal} />

          {isAddColumnModalOpen && (
            <Modal
              isOpen={isAddColumnModalOpen}
              onClose={() => setIsAddColumnModalOpen(false)}
            >
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold">새 칼럼 생성</h2>

                <label className="font-medium flex flex-col gap-2">
                  이름
                  <Input
                    type="text"
                    placeholder="새로운 프로젝트"
                    value={newColumnTitle}
                    onChange={setNewColumnTitle}
                    pattern={pattern}
                    invalidMessage={invalidMessage}
                  />
                </label>
                <div className="flex justify-between ">
                  <CustomBtn
                    variant="outlineDisabled"
                    onClick={() => {
                      setIsAddColumnModalOpen(false);
                    }}
                  >
                    취소
                  </CustomBtn>
                  <CustomBtn
                    variant={isCreateDisabled ? "primaryDisabled" : "primary"}
                    // cursor={isCreateDisabled ? "default" : "pointer" }
                    disabled={isCreateDisabled}
                    onClick={async () => {
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
                  >
                    생성
                  </CustomBtn>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}
