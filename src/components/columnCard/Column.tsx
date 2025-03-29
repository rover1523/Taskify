//column.tsx
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CardType } from "@/types/task";
import Card from "./Card";
import TodoModal from "@/components/modalInput/ToDoModal";
import TodoButton from "@/components/button/TodoButton";
import ColumnManageModal from "@/components/columnCard/ColumnManageModal";
import ColumnDeleteModal from "@/components/columnCard/ColumnDeleteModal";
import { updateColumn, deleteColumn, getCardsByColumn } from "@/api/dashboards";
import { getDashboardMembers } from "@/api/card";

type ColumnProps = {
  columnId: number;
  title?: string;
  // tasks?: CardType[];
  teamId: string;
  dashboardId: number;
};

export default function Column({
  columnId,
  title = "new Task",
  // tasks = [],
  teamId,
  dashboardId,
}: ColumnProps) {
  const [columnTitle, setColumnTitle] = useState(title);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);

  const [members, setMembers] = useState<
    { id: number; userId: number; nickname: string }[]
  >([]);
  const [cards, setCards] = useState<CardType[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  // 카드 페이징 로딩
  const fetchCards = async () => {
    if (isEnd) return;
    try {
      const res = await getCardsByColumn({
        teamId,
        columnId,
        cursorId: cursorId || undefined,
        size: 5,
      });

      if (res.cards.length === 0) {
        setIsEnd(true);
        return;
      }

      setCards((prev) => [...prev, ...res.cards]);
      setCursorId(res.cards[res.cards.length - 1].id);
    } catch (error) {
      console.error("카드 로딩 실패:", error);
    }
  };

  // 무한 스크롤 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting);
        });
      },
      { threshold: 0.5, rootMargin: "300px" }
    );

    if (endRef.current) observer.observe(endRef.current);

    return () => {
      if (endRef.current) observer.unobserve(endRef.current);
    };
  }, []);

  // 첫 카드 로딩
  useEffect(() => {
    if (isIntersecting) fetchCards();
  }, [isIntersecting]);

  // ✅ 멤버 불러오기
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const result = await getDashboardMembers({
          teamId,
          dashboardId,
        });

        const parsed = result.map((m: any) => ({
          id: m.id,
          userId: m.userId,
          nickname: m.nickname || m.email,
        }));

        setMembers(parsed);
      } catch (error) {
        console.error("멤버 불러오기 실패:", error);
      }
    };

    fetchMembers();
  }, [teamId, dashboardId]);

  const handleEditColumn = async (newTitle: string) => {
    if (!newTitle.trim()) {
      alert("칼럼 이름을 입력해주세요.");
      return;
    }

    try {
      const updated = await updateColumn({ teamId, columnId, title: newTitle });
      setColumnTitle(updated.title);
      setIsColumnModalOpen(false);
      alert("칼럼 이름이 변경되었습니다.");
    } catch (error) {
      console.error("칼럼 이름 수정 실패:", error);
      alert("칼럼 이름 수정 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteColumn = async () => {
    try {
      await deleteColumn({ teamId, columnId });
      setIsDeleteModalOpen(false);
      alert("칼럼이 삭제되었습니다.");
      // :point_right: 부모에서 상태를 관리 중이라면 삭제 후 다시 데이터를 불러오거나, 상태 업데이트 필요!
    } catch (error) {
      console.error("칼럼 삭제 실패:", error);
      alert("칼럼 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="w-[354px] flex flex-col rounded-md border-r border-gray-200 bg-gray-50 p-4 ">
      {/* 칼럼 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">
            <span className="text-[var(--primary)]">•</span> {columnTitle}
          </h2>
          <span className="w-5 h-5 text-sm bg-gray-200 text-gray-700 rounded-[4px] flex items-center justify-center ">
            {cards.length}
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
      <div onClick={() => setIsTodoModalOpen(true)} className="mb-3">
        <TodoButton />
      </div>

      {/* 카드 목록 */}
      <div className="flex flex-col gap-3">
        {cards.map((task) => (
          <Card
            key={task.id}
            {...task}
            imageUrl={task.imageUrl}
            assignee={task.assignee}
          />
        ))}
      </div>

      {/* Todo 모달 */}
      {isTodoModalOpen && (
        <TodoModal
          isOpen={isTodoModalOpen}
          onClose={() => setIsTodoModalOpen(false)}
          teamId={teamId}
          dashboardId={dashboardId}
          columnId={columnId}
          members={members} // ✅ 멤버 넘겨줌
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
        columnTitle={columnTitle}
        onEditSubmit={handleEditColumn}
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
