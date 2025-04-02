import { ColumnType } from "@/types/task";
import axiosInstance from "./axiosInstance";
import { apiRoutes } from "./apiRoutes";
import { TEAM_ID } from "@/constants/team";

// 칼럼 생성
export const createColumn = async ({
  title,
  dashboardId,
}: {
  title: string;
  dashboardId: number;
}): Promise<ColumnType> => {
  const res = await axiosInstance.post(`/${TEAM_ID}/columns`, {
    title,
    dashboardId,
  });

  return res.data;
};

// 칼럼 목록 조회
export const getColumns = async ({ dashboardId }: { dashboardId: number }) => {
  const res = await axiosInstance.get(apiRoutes.columns(TEAM_ID), {
    params: {
      dashboardId,
    },
  });

  return res.data;
};

// 칼럼 수정
export const updateColumn = async ({
  columnId,
  title,
}: {
  columnId: number;
  title: string;
}) => {
  const res = await axiosInstance.put(apiRoutes.columnDetail(columnId), {
    title,
  });
  return res.data;
};

// 칼럼 삭제
export const deleteColumn = async ({ columnId }: { columnId: number }) => {
  const res = await axiosInstance.delete(apiRoutes.columnDetail(columnId));
  return res;
};

export const getColumn = async ({
  dashboardId,
}: {
  dashboardId: number;
  columnId: number;
}) => {
  const res = await axiosInstance.get(apiRoutes.columns(TEAM_ID), {
    params: {
      dashboardId,
    },
  });
  console.log("🟦 서버 응답:", res.data);
  console.log("URL:", apiRoutes.columns(TEAM_ID));
  console.log("대시보드 ID:", dashboardId);
  return res.data.data;
};
