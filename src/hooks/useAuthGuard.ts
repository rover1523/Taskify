// 로그아웃 상태에서 인증 필수 페이지 접근 시, 로그인 페이지로 이동

import { useEffect } from "react";
import { useRouter } from "next/router";
import useUserStore from "@/store/useUserStore";

export const useAuthGuard = () => {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  return { user };
};
