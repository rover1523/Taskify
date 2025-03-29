import axiosInstance from "./axiosInstance";

interface UserResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner?: boolean;
  userId?: number;
}

export const getUserInfo = async ({ teamId }: { teamId: string }) => {
  const response = await axiosInstance.get<UserResponse>(`/${teamId}/users/me`);
  return response.data;
};

interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
}

export const signUp = async ({
  teamId,
  payload,
}: {
  teamId: string;
  payload: SignUpRequest;
}) => {
  const response = await axiosInstance.post<SignUpRequest>(
    `/${teamId}/users`,
    payload
  );
  return response.data;
};
