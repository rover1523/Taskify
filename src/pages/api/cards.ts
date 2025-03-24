// 예: src/lib/api/cards.ts
import axiosInstance from "../api/axiosInstance";

export const getCardsByColumn = async ({
  teamId,
  columnId,
}: {
  teamId: string;
  columnId: number;
}) => {
  const res = await axiosInstance.get(`/${teamId}/cards`, {
    params: {
      columnId,
    },
  });

  return res.data;
};
