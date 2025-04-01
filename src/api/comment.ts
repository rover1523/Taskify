import { apiRoutes } from "./apiRoutes";
import axiosInstance from "./axiosInstance";
import {
  CreateCommentType,
  UpdateCommenttype,
  DeleteCommentParams,
} from "../types/comments";

// 댓글 생성
export const createComment = async (data: CreateCommentType) => {
  const response = await axiosInstance.post(apiRoutes.Comments(), data);
  return response.data;
};

// 댓글 목록
export async function getComments({
  cardId,
  pageParam,
}: {
  cardId: number;
  pageParam: number;
}) {
  const response = await axiosInstance.get(apiRoutes.Comments(), {
    params: {
      cardId,
      page: pageParam,
    },
  });

  return {
    comments: response.data.comments,
    nextPage: response.data.nextPage,
  };
}

// 댓글 수정
export const updateComment = async (
  commentId: number,
  data: UpdateCommenttype
) => {
  const response = await axiosInstance.put(
    apiRoutes.CommentsDetail(commentId),
    data
  );
  return response.data;
};
// 댓글 삭제
export const deleteComment = async ({ commentId }: DeleteCommentParams) => {
  const response = await axiosInstance.delete(
    apiRoutes.CommentsDetail(commentId)
  );
  return response.data;
};
