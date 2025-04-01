import axiosInstance from "./axiosInstance";
import { apiRoutes } from "./apiRoutes";

export const getMembers = async ({ dashboardId }: { dashboardId: number }) => {
  if (!dashboardId) {
    console.error("dashboardID가 없습니다.");
    return [];
  }

  const response = await axiosInstance.get(apiRoutes.members(), {
    params: {
      dashboardId,
    },
  });

  return response.data.members || [];
};
