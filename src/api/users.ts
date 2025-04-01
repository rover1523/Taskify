import axiosInstance from "./axiosInstance";
import { apiRoutes } from "./apiRoutes";

export interface UserResponse {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner?: boolean;
  userId?: number;
}

export const getUserInfo = async () => {
  const response = await axiosInstance.get<UserResponse>(apiRoutes.usersMe());
  return response.data;
};

interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
}

export const signUp = async ({
  payload,
}: {
  teamId: string;
  payload: SignUpRequest;
}) => {
  const response = await axiosInstance.post<SignUpRequest>(
    apiRoutes.users(),
    payload
  );
  return response.data;
};
