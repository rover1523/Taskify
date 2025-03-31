import axiosInstance from "./axiosInstance";

export const getMembers = async ({ dashboardId }: { dashboardId: number }) => {
  if (!dashboardId) {
    console.error("dashboardID가 없습니다.");
    return [];
  }

  const response = await axiosInstance.get(`/13-4/members`, {
    params: {
      dashboardId,
    },
  });

  return response.data.members || [];
};
