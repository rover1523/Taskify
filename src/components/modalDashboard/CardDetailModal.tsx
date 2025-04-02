// CardDetailModal.tsx
import { useState } from "react";
import { MoreVertical, X } from "lucide-react";
import CardDetail from "./CardDetail";
import CommentList from "./CommentList";
import CardInput from "@/components/modalInput/CardInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/api/comment";
import { deleteCard } from "@/api/card";
import type { CardDetailType } from "@/types/cards";
import TaskModal from "@/components/modalInput/TaskModal";

interface CardDetailModalProps {
  card: CardDetailType;
  currentUserId: number;
  dashboardId: number;
  onClose: () => void;
}

export default function CardDetailPage({
  card,
  currentUserId,
  dashboardId,
  onClose,
}: CardDetailModalProps) {
  const [cardData, setCardData] = useState<CardDetailType>(card);
  const [commentText, setCommentText] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: createCommentMutate } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries({ queryKey: ["comments", card.id] });
    },
  });

  const { mutate: deleteCardMutate } = useMutation({
    mutationFn: () => deleteCard(card.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      onClose();
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
    <>
      <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
        <div
          className="relative bg-white rounded-lg shadow-lg w-[730px] h-[763px] flex flex-col
        md:w-[678px] lg:w-[730px]
        "
        >
          {/* 오른쪽 상단 메뉴 */}
          <div className="absolute top-6 right-10 z-30 flex items-center gap-5 ">
            <div className="relative">
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="hover:cursor-pointer"
                title="수정하기"
                type="button"
              >
                <MoreVertical className="w-8 h-8 text-gray-500 hover:text-black" />
              </button>
              {showMenu && (
                <div className="absolute right-0.5 p-2 w-27 bg-white border border-[#D9D9D9] z-40 rounded-lg">
                  <button
                    className="block w-full px-4 py-2 text-base text-gray-800 hover:bg-[#F1EFFD] hover:text-[#5534DA] rounded-sm"
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(true);
                      setShowMenu(false);
                    }}
                  >
                    수정하기
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-base text-gray-800 hover:bg-[#F1EFFD] hover:text-[#5534DA] rounded-sm "
                    type="button"
                    onClick={() => deleteCardMutate()}
                  >
                    삭제하기
                  </button>
                </div>
              )}
            </div>
            <button onClick={onClose} title="메뉴 열기">
              <X className="w-8 h-8 text-gray-500 hover:cursor-pointer" />
            </button>
          </div>

          {/* 모달 내부 콘텐츠 */}
          <div className="p-6 flex gap-6 overflow-y-auto flex-1">
            <CardDetail card={cardData} columnName={""} />
          </div>

          {/* 댓글 입력창 */}
          <div className="px-10 pt-2 pb-2">
            <p className="text-sm font-semibold mb-2">댓글</p>
            <div className="w-[450px] h-[110px]">
              <CardInput
                hasButton
                small
                value={commentText}
                onTextChange={setCommentText}
                onButtonClick={handleCommentSubmit}
                placeholder="댓글 작성하기"
                // buttonClassName="border border-[#D9D9D9] text-[#5534DA] hover:bg-[#F1EFFD]"
              />
            </div>
          </div>

          {/* 댓글 목록 */}
          <div className="px-6 space-y-4 max-h-[200px] overflow-y-auto">
            <CommentList
              cardId={card.id}
              currentUserId={currentUserId}
              teamId={""}
            />
          </div>
        </div>
      </div>

      {/* TaskModal 수정 모드 */}
      {isEditModalOpen && (
        <TaskModal
          mode="edit"
          columnId={card.columnId} // ✅ 여기 추가!
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={(data) => {
            setCardData((prev) => ({
              ...prev,
              status: data.status as "todo" | "in-progress" | "done",
              assignee: { ...prev.assignee, nickname: data.assignee },
              title: data.title,
              description: data.description,
              dueDate: data.deadline,
              tags: data.tags,
              imageUrl: data.image ?? "",
            }));
            setIsEditModalOpen(false);
          }}
          initialData={{
            status: cardData.status,
            assignee: cardData.assignee.nickname,
            title: cardData.title,
            description: cardData.description,
            deadline: cardData.dueDate,
            tags: cardData.tags,
            image: cardData.imageUrl ?? "",
          }}
          members={[{ nickname: cardData.assignee.nickname }]}
        />
      )}
    </>
  );
}
