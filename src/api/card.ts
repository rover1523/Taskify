import axiosInstance from "@/api/axiosInstance";

// 카드 생성에 필요한 파라미터 타입 정의
interface CreateCardParams {
  teamId: string;
  assigneeUserId?: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description?: string;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string;
}

// ✅ 이미지 업로드 함수
export const uploadImage = async (
  teamId: string,
  columnId: number,
  formData: FormData
): Promise<string> => {
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

// ✅ 카드 생성 함수
export const createCard = async ({ teamId, ...body }: CreateCardParams) => {
  const response = await axiosInstance.post(`/${teamId}/cards`, body);
  return response.data;
};

// ✅ 대시보드 초대 멤버 목록 가져오기 함수
export const getMembers = async (
  teamId: string,
  dashboardId: number
): Promise<{ id: number; name: string }[]> => {
  const res = await axiosInstance.get(
    `/${teamId}/members?page=1&size=20&dashboardId=${dashboardId}`
  );

  return res.data.members.map((member: any) => ({
    id: member.userId,
    name: member.nickname,
  }));
};
