// Column.tsx
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CardType } from "@/types/task";
import Card from "./Card";
import TodoModal from "@/components/modalInput/ToDoModal";
import TodoButton from "@/components/button/TodoButton";
import ColumnManageModal from "@/components/columnCard/ColumnManageModal";
import ColumnDeleteModal from "@/components/columnCard/ColumnDeleteModal";
import CardDetailModal from "../modalDashboard/CardDetailModal";
import { updateColumn, deleteColumn, getCardsByColumn } from "@/api/dashboards";
import { getDashboardMembers } from "@/api/card";
import { MemberType } from "@/types/users";

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
  const [columnTitle, setColumnTitle] = useState(title);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [members, setMembers] = useState<
    { id: number; userId: number; nickname: string }[]
  >([]);
  // 무한스크롤 관련 상태
  const [cards, setCards] = useState<CardType[]>(tasks || []);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null); // observer 대상

  // ✅ 초기 cursorId 설정
  useEffect(() => {
    if (tasks.length > 0) {
      setCursorId(tasks[tasks.length - 1].id);
    }
  }, [tasks]);

  // ✅ IntersectionObserver 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.5, rootMargin: "300px" }
    );

    if (endRef.current) observer.observe(endRef.current);
    return () => {
      if (endRef.current) observer.unobserve(endRef.current);
    };
  }, []);

  // ✅ 스크롤 감지되면 카드 더 불러오기
  useEffect(() => {
    if (isIntersecting && hasMore) {
      fetchMoreCards();
    }
  }, [isIntersecting]);

  // ✅ 카드 추가 불러오기
  const fetchMoreCards = async () => {
    try {
      const res = await getCardsByColumn({
        teamId,
        columnId,
        cursorId,
        size: 5,
      });

      if (res.cards.length > 0) {
        setCards((prev) => [...prev, ...res.cards]);
        setCursorId(res.cards[res.cards.length - 1].id);
      }

      if (res.cards.length < 5 || res.cursorId === null) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("❌ 카드 추가 로딩 실패:", error);
    }
  };

  // ✅ 멤버 불러오기
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const result = await getDashboardMembers({
          teamId,
          dashboardId,
        });

        const parsed = result.map((m: MemberType) => ({
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
    } catch (error) {
      console.error("칼럼 삭제 실패:", error);
      alert("칼럼 삭제에 실패했습니다.");
    }
  };

  const handleCardClick = (card: CardType) => {
    setSelectedCard(card);
  };
  const handleCloseDetailModal = () => {
    setSelectedCard(null);
  };

  return (
    <div
      className={`
    flex flex-col border-r border-gray-200 bg-gray-50 rounded-md p-4
    h-auto sm:m-h-screen lg:w-[354px]
    max-h-[401px] sm:max-h-none
  `}
    >
      {/* 칼럼 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">
            <span className="text-[var(--primary)]">•</span> {columnTitle}
          </h2>
          <span className="w-5 h-5 text-sm bg-gray-200 text-gray-700 rounded-[4px] flex items-center justify-center ">
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

      {/* 카드 영역 */}
      <div className="flex-1 pb-4 flex flex-col items-center gap-3 ">
        <div onClick={() => setIsTodoModalOpen(true)} className="mb-2">
          <TodoButton />
        </div>

        {/* 카드 렌더링 */}
        <div className="w-full flex flex-wrap justify-center gap-3">
          {cards.map((task) => (
            <Card
              key={task.id}
              {...task}
              imageUrl={task.imageUrl}
              assignee={task.assignee}
              onClick={() => handleCardClick(task)}
            />
          ))}
        </div>
      </div>

      {/* Todo 모달 */}
      {isTodoModalOpen && (
        <TodoModal
          isOpen={isTodoModalOpen}
          onClose={() => setIsTodoModalOpen(false)}
          teamId={teamId}
          dashboardId={dashboardId}
          columnId={columnId}
          members={members}
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

      {selectedCard && (
        <CardDetailModal card={selectedCard} onClose={handleCloseDetailModal} />
      )}
    </div>
  );
}
