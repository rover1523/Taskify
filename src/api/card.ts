import axiosInstance from "./axiosInstance";
import type { CardType } from "@/types/cards"; // Dashboard 타입 import
import { apiRoutes } from "@/api/apiRoutes";

/** 1. 카드 이미지 업로드 */
export const uploadCardImage = async ({
  teamId,
  columnId,
  imageFile,
}: {
  teamId: string;
  columnId: number;
  imageFile: File;
}): Promise<string> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await axiosInstance.post(
    `/${teamId}/columns/${columnId}/card-image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.imageUrl;
};

/** 2. 카드 생성 */
export const createCard = async ({
  teamId,
  assigneeUserId,
  dashboardId,
  columnId,
  title,
  description,
  dueDate,
  tags,
  imageUrl,
}: {
  teamId: string;
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl?: string;
}) => {
  const response = await axiosInstance.post(`/${teamId}/cards`, {
    assigneeUserId,
    dashboardId,
    columnId,
    title,
    description,
    dueDate,
    tags,
    imageUrl,
  });

  return response.data;
};

/** 3. 대시보드 멤버 조회 (담당자용) */
export const getDashboardMembers = async ({
  teamId,
  dashboardId,
  page = 1,
  size = 20,
}: {
  teamId: string;
  dashboardId: number;
  page?: number;
  size?: number;
}) => {
  const res = await axiosInstance.get(`/${teamId}/members`, {
    params: {
      page,
      size,
      dashboardId,
    },
  });

  return res.data.members;
};

/** 4. 카드 수정 */
export const updateCard = async ({
  teamId,
  cardId,
  columnId,
  assigneeUserId,
  title,
  description,
  dueDate,
  tags,
  imageUrl,
}: {
  teamId: string;
  cardId: number;
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl?: string;
}) => {
  const response = await axiosInstance.put(`/${teamId}/cards/${cardId}`, {
    columnId,
    assigneeUserId,
    title,
    description,
    dueDate,
    tags,
    imageUrl,
  });

  return response.data;
};

// 카드조회
export async function getCardDetail(cardId: number): Promise<CardType> {
  try {
    // apiRoutes를 사용하여 URL 동적 생성
    const url = apiRoutes.CardDetail(cardId);
    const response = await axiosInstance.get(url);
    return response.data as CardType;
  } catch (error) {
    console.error("대시보드 데이터를 불러오는 데 실패했습니다.", error);
    throw error;
  }
}
// 카드 삭제 api
export const deleteCard = async (teamId: string, cardId: number) => {
  const url = apiRoutes.CardDetail(cardId);
  const response = await axiosInstance.delete(url);
  return response.data;
};

// 카드 목록 조회
export const getCardsByColumn = async ({
  teamId,
  columnId,
  cursorId,
  size = 10,
}: {
  teamId: string;
  columnId: number;
  cursorId?: number;
  size?: number;
}) => {
  const res = await axiosInstance.get(`/${teamId}/cards`, {
    params: {
      columnId,
      cursorId,
      size,
    },
  });

  return res.data;
};
