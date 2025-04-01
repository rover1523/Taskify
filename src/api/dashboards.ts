import axiosInstance from "./axiosInstance";
import { apiRoutes } from "./apiRoutes";

export interface Dashboard {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

// 대시보드 생성 (POST)
export const createDashboard = async ({
  title,
  color,
}: {
  teamId: string;
  title: string;
  color: string;
}) => {
  const res = await axiosInstance.post(apiRoutes.dashboards(), {
    title,
    color,
  });
  return res.data;
};

// 대시보드 목록 조회 (GET)
export const getDashboards = async ({
  navigationMethod = "pagination",
  page = 1,
  size = 10,
}: {
  teamId: string;
  navigationMethod?: "pagination";
  page?: number;
  size?: number;
}): Promise<{
  dashboards: Dashboard[];
  totalCount: number;
  cursorId: string | null;
}> => {
  const res = await axiosInstance.get(apiRoutes.dashboards(), {
    params: { navigationMethod, page, size },
  });

  return res.data;
};

// 대시보드 상세 조회 (GET)
export const getDashboardById = async ({
  teamId,
  dashboardId,
}: {
  teamId: string;
  dashboardId: number;
}) => {
  const res = await axiosInstance.get(apiRoutes.dashboardDetail(dashboardId));
  return res.data;
};

// 대시보드 수정 (PUT)

// 대시보드 삭제 (DELETE)

// 대시보드 초대하기 (POST)

// 대시보드 초대 불러오기 (GET)

// 대시보드 초대 취소 (DELETE)
