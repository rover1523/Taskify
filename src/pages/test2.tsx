import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CardDetailModal from "@/components/modalDashboard/CardDetailmodal";
import { getCardDetail } from "@/api/card";
import type { CardType } from "@/types/cards";

export default function Test2Page() {
  const [open, setOpen] = useState(false);
  const teamId = "13-4";
  const cardId = 11934; // 실제 카드 ID

  const { data: card, isLoading } = useQuery<CardType>({
    queryKey: ["card", cardId],
    queryFn: () => getCardDetail(cardId),
    enabled: open, // 모달 열릴 때만 fetch
  });

  return (
    <div className="p-8">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        카드 상세 보기
      </button>

      {open && card && (
        <CardDetailModal
          card={card}
          currentUserId={5359}
          teamId={teamId}
          dashboardId={13779}
          onClose={() => setOpen(false)}
        />
      )}

      {open && isLoading && (
        <div className="mt-4 text-gray-500">카드 데이터를 불러오는 중...</div>
      )}
    </div>
  );
}
