// ✅ UpdateComment.tsx
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { deleteComment, updateComment } from "@/api/comment";
import { Comment } from "@/types/comments";
import { ProfileIcon } from "./profelicon";
import formatDate from "./formatDate";

interface UpdateCommentProps {
  comment: Comment;
  currentUserId: number;
  teamId: string;
}

export default function UpdateComment({
  comment,
  currentUserId,
}: UpdateCommentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const queryClient = useQueryClient();

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedContent(comment.content);
  };

  const handleDelete = async () => {
    await deleteComment({ commentId: comment.id });
    queryClient.invalidateQueries({ queryKey: ["comments", comment.cardId] });
  };

  const handleSave = async () => {
    await updateComment(comment.id, {
      ...comment,
      content: editedContent,
    });
    queryClient.invalidateQueries({ queryKey: ["comments", comment.cardId] });
    setIsEditing(false);
  };

  return (
    <div className="flex gap-2 items-start">
      <ProfileIcon
        userId={comment.author.id}
        nickname={comment.author.nickname}
        profileImageUrl={comment.author.profileImageUrl}
        imgClassName=""
        fontClassName=""
        id={0}
      />
      <div className="flex flex-col gap-1 w-full">
        <div className="flex gap-2 items-center">
          <span className="text-sm font-semibold">
            {comment.author.nickname}
          </span>
          <span className="text-xs text-gray-500">
            {formatDate(comment.createdAt)}
          </span>
        </div>
        {isEditing ? (
          <>
            <textarea
              className="w-full border p-2 rounded text-sm"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex gap-2 mt-1 text-xs text-gray-600">
              <button
                onClick={handleSave}
                disabled={editedContent === comment.content}
              >
                저장
              </button>
              <button onClick={handleEditToggle}>취소</button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm">{comment.content}</p>
            {currentUserId === comment.author.id && (
              <div className="flex gap-2 text-xs text-gray-500 mt-1">
                <button onClick={handleEditToggle}>수정</button>
                <button onClick={handleDelete}>삭제</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
