import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getColumns, getCardsByColumn } from "@/api/dashboard";
import Column from "@/components/ColumnCard/Column";
import { CardType, ColumnType, TasksByColumn } from "@/types/task";
import HeaderBebridge from "@/components/Gnb/HeaderBebridge";

export default function Dashboard() {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [tasksByColumn, setTasksByColumn] = useState<TasksByColumn>({});
  const router = useRouter();
  const { dashboardId } = router.query;

  const teamId = "13-4";

  const goToEditPage = () => {
    if (typeof dashboardId === "string") {
      router.push(`/dashboard/${dashboardId}/edit`);
    }
  };

  useEffect(() => {
    if (typeof dashboardId !== "string") return;

    const fetchColumnsAndCards = async () => {
      try {
        // 1. 칼럼 가져오기
        const columnRes = await getColumns({ teamId, dashboardId });
        setColumns(columnRes.data);

        // 2. 각 칼럼의 카드 가져오기
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
        console.error(err);
      }
    };

    fetchColumnsAndCards();
  }, [dashboardId]);

  return (
    <div>
      <div>
        <HeaderBebridge />
      </div>
      <div className="flex gap-4 p-6">
        {columns.map((col) => (
          <Column
            key={col.id}
            title={col.title}
            tasks={tasksByColumn[col.id] || []}
          />
        ))}
      </div>
    </div>
  );
}
