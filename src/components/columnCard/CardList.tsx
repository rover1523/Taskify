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
  onCardCountChange?: (count: number) => void;
};

const ITEMS_PER_PAGE = 6;

export default function CardList({
  columnId,
  initialTasks,
  onCardClick,
}: CardListProps) {
  const [cards, setCards] = useState<CardType[]>(initialTasks); // 렌더링할 카드들
  const [cursorId, setCursorId] = useState<number | null>(null); // 마지막 카드 ID 저장
  const [hasMore, setHasMore] = useState(true); // 더 불러올 카드가 있는지
  const observerRef = useRef<HTMLDivElement | null>(null); // 옵저버를 붙일 DOM 참조
  const isFetchingRef = useRef(false); // 중복 fetch 방지

  useEffect(() => {
    if (initialTasks.length > 0) {
      setCursorId(initialTasks[initialTasks.length - 1].id);
    }
  }, [initialTasks]);
  // 초기 카드 목록에서 마지막 카드의 ID를 cursorId로 설정 → 이후 이 ID를 기준으로 다음 카드들을 요청함

  // ✅ IntersectionObserver 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore) {
            fetchMoreCards();
          }
        });
      },
      { threshold: 0.5 }
    );
    // IntersectionObserver: 특정 요소가 뷰포트에 50% 이상 보일 때 실행
    //entry.isIntersecting이 true이고 hasMore가 true면 fetchMoreCards() 호출

    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore]);
  // observerRef가 가리키는 요소(보통 가장 마지막 카드 아래 div)를 감시
  // 컴포넌트 언마운트 시 unobserve()로 옵저버 해제

  // ✅ 카드 더 불러오기
  const fetchMoreCards = async () => {
    if (isFetchingRef.current || !hasMore) return; //중복 호출 방지를 위해 isFetchingRef가 true일 때는 return
    isFetchingRef.current = true; // 이미 마지막 페이지까지 갔다면 hasMore === false이므로 return

    try {
      const res = await getCardsByColumn({
        columnId,
        size: ITEMS_PER_PAGE,
        cursorId: cursorId ?? undefined,
      });

      console.log("📦 카드 API 응답:", res);
      // getCardsByColum  API를 호출해서 카드 6개 받아옴
      // 현재 cursorId 이후의 카드들을 요청함
      const newCards = res.cards as CardType[];
      const nextCursorId = res.cursorId ?? newCards[newCards.length - 1]?.id; // fallback

      if (newCards.length > 0) {
        setCards((prev) => {
          const existingIds = new Set(prev.map((card) => card.id));
          const uniqueCards = newCards.filter(
            (card) => !existingIds.has(card.id)
          );
          return [...prev, ...uniqueCards];
        });
        // 기존 카드들과 중복되지 않도록 Set을 써서 필터링
        // 카드 배열을 업데이트
        // cursorId를 가장 마지막 카드 ID로 업데이트

        if (nextCursorId !== null && nextCursorId !== undefined) {
          setCursorId(nextCursorId); // ✅ fallback 된 값이 들어감
        } else {
          setHasMore(false);
        }
      }

      if (newCards.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("❌ 카드 로딩 실패:", error);
    } finally {
      isFetchingRef.current = false;
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
      {hasMore && <div ref={observerRef} className="h-4" />}
    </div>
  );
}
// 현재까지 받은 카드를 모두 .map()으로 렌더링
// 마지막에 ref={observerRef}를 가진 div가 있고, 이게 뷰포트에 들어오면 옵저버가 실행됨
