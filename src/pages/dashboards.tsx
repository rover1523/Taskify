import { TaskType } from "@/types/task";
import { useState, useEffect } from "react";
import { getCardsByColumn } from "./api/cards";
import ImageCard from "@/components/ColumnCard/ImageCard";

export default function DashboardPage() {
  const [cards, setCards] = useState<TaskType[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const teamId = "13-4";
        const columnId = 46299;
        const res = await getCardsByColumn({ teamId, columnId });

        console.log("카드 불러오기 성공:", res);
        setCards(res.cards);
      } catch (error) {
        console.error("카드 불러오기 실패:", error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        📋 카드 목록 테스트 (ImageCard)
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <ImageCard
            key={card.id}
            title={card.title}
            dueDate={card.dueDate}
            tags={card.tags}
            imageUrl={card.imageUrl}
            assignee={card.assignee?.nickname}
          />
        ))}
      </div>
    </div>
  );
}
