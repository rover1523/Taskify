import axiosInstance from "./axiosInstance";
import { apiRoutes } from "./apiRoutes";
import { UserType } from "@/types/users";

interface AuthResponse extends UserType {
  accessToken: string;
}

export const postAuthData = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post<AuthResponse>(apiRoutes.login(), {
    email,
    password,
  });
  return response.data;
};
