// dashboards.ts
import { ColumnType } from "@/types/task";
import axiosInstance from "./axiosInstance";

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

export const getColumns = async ({
  teamId,
  dashboardId,
}: {
  teamId: string;
  dashboardId: string;
}) => {
  const res = await axiosInstance.get(`/${teamId}/columns`, {
    params: {
      dashboardId,
    },
  });

  return res.data;
};

export const getDashboards = async ({
  teamId,
  navigationMethod = "pagination",
  page = 1,
  size = 10,
}: {
  teamId: string;
  navigationMethod?: "pagination";
  page?: number;
  size?: number;
}) => {
  const res = await axiosInstance.get(`/${teamId}/dashboards`, {
    params: { navigationMethod, page, size },
  });

  return res.data;
};

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
  const res = await axiosInstance.post(`/${teamId}/columns`, {
    title,
    dashboardId,
  });

  return res.data;
};
