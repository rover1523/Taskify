import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import HeaderBebridge from "@/components/Gnb/HeaderBebridge";
import { getColumns, getCardsByColumn } from "@/api/dashboard";
import Column from "@/components/ColumnCard/Column";
import { CardType, ColumnType, TasksByColumn } from "@/types/task";
import SideMenu from "@/components/SideMenu/SideMenu";

export default function Dashboard() {
  const router = useRouter();
  const { dashboardId } = router.query;
  const [isReady, setIsReady] = useState(false);
  const teamId = "13-4";

  // 칼럼 + 카드 상태
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [tasksByColumn, setTasksByColumn] = useState<TasksByColumn>({});

  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openInviteModal = () => setIsModalOpen(true);
  const closeInviteModal = () => setIsModalOpen(false);

  // router 준비되었을 때 렌더링
  useEffect(() => {
    if (router.isReady && dashboardId) {
      setIsReady(true);
    }
  }, [router.isReady, dashboardId]);

  // 칼럼 + 카드 로딩
  useEffect(() => {
    if (!isReady || typeof dashboardId !== "string") return;

    const fetchColumnsAndCards = async () => {
      try {
        // 1. 칼럼 목록
        const columnRes = await getColumns({ teamId, dashboardId });
        setColumns(columnRes.data);

        // 2. 카드 목록
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
    <div>
      <HeaderBebridge dashboardId={dashboardId} />

      <div className="flex">
        {/* 사이드메뉴 왼쪽 */}
        <SideMenu dashboardList={dashboardList} />

        {/* 콘텐츠 오른쪽 */}
        <div className="flex-1 p-6">
          <div className="flex gap-4">
            {columns.map((col) => (
              <Column
                key={col.id}
                title={col.title}
                tasks={tasksByColumn[col.id] || []}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
