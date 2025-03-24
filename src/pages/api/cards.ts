// 예: src/lib/api/cards.ts
import axiosInstance from "../api/axiosInstance";

export const getCardsByColumn = async ({
  teamId,
  columnId,
  size = 10,
  cursorId,
}: {
  teamId: string;
  columnId: number;
  size?: number;
  cursorId?: number;
}) => {
  const res = await axiosInstance.get(`/${teamId}/cards`, {
    params: {
      columnId,
      size,
      cursorId,
    },
  });

  return res.data;
};
