// CardList.tsx (무한스크롤 분리 및 중복 제거 개선)

import { useEffect, useRef, useState } from "react";
import { CardType } from "@/types/task";
import Card from "./Card";
import { getCardsByColumn } from "@/api/card";

type CardListProps = {
  columnId: number;
  teamId: string;
  initialTasks: CardType[];
  onCardClick: (card: CardType) => void;
};

export default function CardList({
  columnId,
  teamId,
  initialTasks,
  onCardClick,
}: CardListProps) {
  const [cards, setCards] = useState<CardType[]>(initialTasks);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialTasks.length > 0) {
      setCursorId(initialTasks[initialTasks.length - 1].id);
    }
  }, [initialTasks]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (endRef.current) observer.observe(endRef.current);
    return () => {
      if (endRef.current) observer.unobserve(endRef.current);
    };
  }, []);

  useEffect(() => {
    if (isIntersecting && hasMore) {
      fetchMoreCards();
    }
  }, [isIntersecting]);

  // ✅ 뷰포트 채워지지 않았을 때 자동 추가 fetch
  useEffect(() => {
    const tryFillViewport = async () => {
      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      if (pageHeight <= viewportHeight && hasMore) {
        await fetchMoreCards();
      }
    };

    tryFillViewport();
  }, [cards]);

  const fetchMoreCards = async () => {
    try {
      const params: any = { columnId, size: 5 };
      if (cursorId !== null) params.cursorId = cursorId;

      const res = await getCardsByColumn({ teamId, ...params });

      if (res.cards.length > 0) {
        setCards((prev) => {
          const existingIds = new Set(prev.map((card) => card.id));
          const newCards = res.cards.filter(
            (card: CardType) => !existingIds.has(card.id)
          );
          return [...prev, ...newCards];
        });
        setCursorId(res.cards[res.cards.length - 1].id);
      }

      if (res.cards.length < 5) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("❌ 카드 추가 로딩 실패:", error);
    }
  };

  return (
    <div className="grid gap-3 w-full grid-cols-1">
      {cards.map((task) => (
        <Card
          key={task.id}
          {...task}
          assignee={task.assignee}
          onClick={() => onCardClick(task)}
        />
      ))}
      {hasMore && <div ref={endRef} className="h-4" />}
    </div>
  );
}
