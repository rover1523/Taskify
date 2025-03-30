// 로그아웃 상태에서 인증 필수 페이지 접근 시, 로그인 페이지로 이동
import { useEffect } from "react";
import { useRouter } from "next/router";
import useUserStore from "@/store/useUserStore";
import { getUserInfo } from "@/api/users";
import { TEAM_ID } from "@/constants/team";

export const useAuthGuard = (redirectTo: string = "/login") => {
  const { user, setUser, isInitialized } = useUserStore();
  const router = useRouter();

  // 새로고침 시 유저 정보 복원
  useEffect(() => {
    const restoreUser = async () => {
      const token = localStorage.getItem("accessToken");

      if (token && !user) {
        try {
          const data = await getUserInfo({ teamId: TEAM_ID });
          setUser(data);
        } catch (error) {
          console.error("유저 복원 실패:", error);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("expiresAt");
          router.replace(redirectTo);
        }
      }
    };

    restoreUser();
  }, [user, redirectTo, setUser, router]);

  // 로그아웃 상태에서 인증 페이지 접근 시 로그인 페이지로 이동
  useEffect(() => {
    const isLoggingOut = localStorage.getItem("isLoggingOut");

    if (isInitialized && !user && !isLoggingOut) {
      router.replace(redirectTo);
    }

    // 로그아웃 처리 완료 후 플래그 제거
    if (isLoggingOut) {
      localStorage.removeItem("isLoggingOut");
    }
  }, [user, isInitialized, redirectTo, router]);

  return { user, isInitialized };
};
