import { ColumnType } from "@/types/task";
import axiosInstance from "./axiosInstance";
import { apiRoutes } from "./apiRoutes";

// 칼럼 생성
export const createColumn = async ({
  teamId,
  title,
  dashboardId,
}: {
  teamId: string;
  title: string;
  dashboardId: number;
}): Promise<ColumnType> => {
  const res = await axiosInstance.post(apiRoutes.Columns(), {
    title,
    dashboardId,
  });

  return res.data;
};

// 칼럼 목록 조회
export const getColumns = async ({
  teamId,
  dashboardId,
}: {
  teamId: string;
  dashboardId: number;
}) => {
  const res = await axiosInstance.get(apiRoutes.Columns(), {
    params: {
      dashboardId,
    },
  });

  return res.data;
};

// 칼럼 수정
export const updateColumn = async ({
  teamId,
  columnId,
  title,
}: {
  teamId: string;
  columnId: number;
  title: string;
}) => {
  const res = await axiosInstance.put(apiRoutes.ColumnDetail(columnId), {
    title,
  });
  return res.data;
};

// 칼럼 삭제
export const deleteColumn = async ({
  teamId,
  columnId,
}: {
  teamId: string;
  columnId: number;
}) => {
  const res = await axiosInstance.delete(apiRoutes.ColumnDetail(columnId));
  return res;
};
