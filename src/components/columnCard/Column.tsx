// components/column/Column.tsx
import { useState } from "react";
import Image from "next/image";
import { CardType } from "@/types/task";
import Card from "./Card";
import TodoModal from "@/components/modalInput/ToDoModal";
import TodoButton from "@/components/button/TodoButton";
import ColumnManageModal from "@/components/columnCard/ColumnManageModal";
import ColumnDeleteModal from "@/components/columnCard/ColumnDeleteModal";
import { deleteColumn } from "@/api/dashboards";

type ColumnProps = {
  columnId: number;
  title?: string;
  tasks?: CardType[];
  teamId: string;
  dashboardId: number;
};

export default function Column({
  columnId,
  title = "new Task",
  tasks = [],
  teamId,
  dashboardId,
}: ColumnProps) {
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);

  const handleDeleteColumn = async () => {
    try {
      await deleteColumn({ teamId, columnId });
      setIsDeleteModalOpen(false);
      alert("칼럼이 삭제되었습니다.");
      // 👉 부모에서 상태를 관리 중이라면 삭제 후 다시 데이터를 불러오거나, 상태 업데이트 필요!
    } catch (error) {
      console.error("칼럼 삭제 실패:", error);
      alert("칼럼 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="w-[354px] h-[1010px] border-[var(--color-gray4)] flex flex-col rounded-md border border-solid bg-gray-50 p-4">
      {/* 칼럼 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">
            <span className="text-[var(--primary)]">•</span> {title}
          </h2>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
            {tasks.length}
          </span>
        </div>
        <Image
          src="/svgs/settings.svg"
          alt="setting icon"
          width={24}
          height={24}
          priority
          className="cursor-pointer"
          onClick={() => setIsColumnModalOpen(true)}
        />
      </div>

      {/* Todo 추가 버튼 */}
      <div onClick={() => setIsTodoModalOpen(true)}>
        <TodoButton />
      </div>

      {/* 카드 목록 */}
      {tasks.map((task) => (
        <Card
          key={task.id}
          {...task}
          imageUrl={task.imageUrl}
          assignee={task.assignee}
        />
      ))}

      {/* Todo 모달 */}
      {isTodoModalOpen && (
        <TodoModal
          isOpen={isTodoModalOpen} // todo todomodal에서 타입정의 추가하기 (isOpen, teamId, dashboardId)
          onClose={() => setIsTodoModalOpen(false)}
          teamId={teamId}
          dashboardId={dashboardId}
        />
      )}

      {/* 칼럼 관리 모달 */}
      <ColumnManageModal
        isOpen={isColumnModalOpen}
        onClose={() => setIsColumnModalOpen(false)}
        onDeleteClick={() => {
          setIsColumnModalOpen(false);
          setIsDeleteModalOpen(true);
        }}
        columnTitle={title}
      />

      {/* 칼럼 삭제 확인 모달 */}
      <ColumnDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteColumn}
      />
    </div>
  );
}
