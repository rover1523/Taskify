import axiosInstance from "./axiosInstance";
import { apiRoutes } from "./apiRoutes";
import { UserResponse } from "./user";

interface AuthResponse extends UserResponse {
  accessToken: string;
}

export const postAuthData = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post<AuthResponse>(apiRoutes.Login(), {
    email,
    password,
  });
  return response.data;
};
