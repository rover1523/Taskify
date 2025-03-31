import { useState } from "react";
import { MoreVertical, X } from "lucide-react"; // lucide 아이콘
import CardDetail from "./CardDetail";
import CommentList from "./CommentList";
import CardInput from "@/components/modalInput/CardInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/api/comment";
import { deleteCard } from "@/api/card";
import type { CardType } from "@/types/cards";

interface CardDetailModalProps {
  card: CardType;
  currentUserId: number;
  teamId: string;
  dashboardId: number;
  onClose: () => void;
  onEditClick?: () => void; // 수정 모달 열기용 (선택)
}

export default function CardDetailPage({
  card,
  currentUserId,
  teamId,
  dashboardId,
  onClose,
  onEditClick,
}: CardDetailModalProps) {
  const [commentText, setCommentText] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: createCommentMutate } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      console.log("댓글 등록 성공!");
      setCommentText("");
      queryClient.invalidateQueries({ queryKey: ["comments", card.id] });
    },
  });

  const { mutate: deleteCardMutate } = useMutation({
    mutationFn: () => deleteCard(teamId, card.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      onClose(); // 모달 닫기
    },
  });

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    createCommentMutate({
      content: commentText,
      cardId: card.id,
      columnId: card.columnId,
      dashboardId,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-lg w-[730px] h-[763px] flex flex-col justify-center">
        {/* 오른쪽 상단 메뉴 */}
        <div className="absolute top-2 right-6 w-[50px] h-[50px] z-30 flex items-center gap-2">
          <div className="relative">
            <button onClick={() => setShowMenu((prev) => !prev)}>
              <MoreVertical className="w-8 h-8 text-gray-500 hover:text-black" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow z-40">
                <button
                  className="block w-full px-3 py-2 text-sm text-violet-600 hover:bg-gray-100"
                  onClick={() => {
                    onEditClick?.();
                    setShowMenu(false);
                  }}
                >
                  수정하기
                </button>
                <button
                  className="block w-full px-3 py-2 text-sm text-red-500 hover:bg-gray-100"
                  onClick={() => deleteCardMutate()}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
          <button onClick={onClose}>
            <X className="w-8 h-8 text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* 모달 내부 콘텐츠 */}
        <div className="p-6 space-y-6">
          <CardDetail card={card} columnName={""} />
        </div>

        {/* 댓글 입력창 */}
        <div className="p-4 border-t">
          <CardInput
            hasButton
            small
            value={commentText}
            onTextChange={setCommentText}
            onButtonClick={handleCommentSubmit}
          />
        </div>

        {/* 댓글 목록 */}
        <div className="px-6 space-y-4 max-h-[300px] overflow-y-auto">
          <CommentList
            cardId={card.id}
            currentUserId={currentUserId}
            teamId={teamId}
          />
        </div>
      </div>
    </div>
  );
}
