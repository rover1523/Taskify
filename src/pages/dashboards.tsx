// src/pages/dashboards.tsx
import { useEffect, useState } from "react";
import { getDashboards } from "./api/cards";
import { getColumns } from "./api/cards";
import { getCardsByColumn } from "./api/cards";
import ColumnCard from "@/components/ColumnCard/ColumnCard";
import { TaskType } from "@/types/task";

// 타입 정의
interface ColumnType {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [tasksByColumn, setTasksByColumn] = useState<{
    [columnId: number]: TaskType[];
  }>({});

  useEffect(() => {
    const fetchDashboardsAndColumns = async () => {
      try {
        const teamId = "13-4";

        // 1. 대시보드 목록 가져오기
        const dashboardRes = await getDashboards({
          teamId,
          navigationMethod: "pagination",
          page: 1,
          size: 10,
        });

        const dashboardId = dashboardRes.dashboards[0]?.id;
        if (!dashboardId) return;

        // 2. 해당 대시보드의 칼럼 목록 가져오기
        const columnRes = await getColumns({ teamId, dashboardId });
        setColumns(columnRes.data);

        // 3. 각 칼럼의 카드 목록 가져오기
        const columnTasks: { [columnId: number]: TaskType[] } = {};

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

    fetchDashboardsAndColumns();
  }, []);

  return (
    <div className="flex gap-4 p-6">
      {columns.map((col) => (
        <ColumnCard
          key={col.id}
          title={col.title}
          tasks={tasksByColumn[col.id] || []}
        />
      ))}
    </div>
  );
}
