// 로그아웃 상태에서 인증 필수 페이지 접근 시, 로그인 페이지로 이동
import { useEffect } from "react";
import { useRouter } from "next/router";
import useUserStore from "@/store/useUserStore";
import { getUserInfo } from "@/api/users";
import { TEAM_ID } from "@/constants/team";

export const useAuthGuard = (redirectTo = "/login") => {
  const { user, setUser } = useUserStore();
  const router = useRouter();

  // 새로고침 시 zustand의 user값 초기화 되는 현상 fix 목적
  // 토큰이 있지만 user값 null일 때 사용자 정보 reload
  useEffect(() => {
    const restoreUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token && !user) {
        try {
          const data = await getUserInfo({ teamId: TEAM_ID });
          setUser(data);
        } catch (error) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("expiresAt");
          router.replace(redirectTo);
        }
      } else if (!token) {
        router.replace(redirectTo);
      }
    };

    restoreUser();
  }, [user, redirectTo]);

  return { user };
};
