import { useState } from "react";
import { useRouter } from "next/router";
import useUserStore from "@/store/useUserStore";
import { getUserInfo } from "@/api/users";
import { postAuthData } from "@/api/auth";
import { parseJwt } from "@/utils/parseJwt";
import Link from "next/link";
import Input from "@/components/input/Input";
import { TEAM_ID } from "@/constants/team";

export default function LoginPage() {
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const isFormValid = Object.values(values).every((v) => v.trim() !== "");

  const handleChange = (name: string) => (value: string) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = values;
    try {
      const { accessToken, expiresIn } = await postAuthData({
        email,
        password,
      });

      // 현재 백엔드에서 exp 없어서 로그인 만료 설정 불가능, 요청해보고 안 되면 제거
      // 만료 시간 계산 후 저장
      const payload = parseJwt(accessToken);
      console.log(payload.exp);
      const expiresAt = new Date().getTime() + expiresIn * 1000;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("expiresAt", expiresAt.toString());

      // 로그인 성공 시 사용자 정보 요청
      const userData = await getUserInfo({ teamId: TEAM_ID });
      // Zustand에 저장
      useUserStore.getState().setUser(userData);

      router.push("/mydashboard");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[var(--color-gray5)] py-10">
      <div className="text-center mb-[40px]">
        <img
          src="/svgs/main-logo.svg"
          alt="태스키파이 로고 이미지"
          className="w-[200px] h-[280px]"
        />
        <p className="font-20m text-black3">오늘도 만나서 반가워요!</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[350px] md:w-[520px] gap-[20px] font-16r text-black3"
      >
        <Input
          type="email"
          name="email"
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          onChange={handleChange("email")}
          invalidMessage="올바른 이메일 주소를 입력해 주세요"
        />

        <Input
          type="password"
          name="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요"
          onChange={handleChange("password")}
          pattern=".{8,}"
          invalidMessage="비밀번호는 8자 이상이어야 해요"
        />

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full h-[50px] rounded-[8px] text-white font-18m transition ${
            isFormValid
              ? "bg-[var(--primary)] cursor-pointer hover:opacity-90}"
              : "bg-[var(--color-gray2)] cursor-not-allowed"
          }`}
        >
          로그인
        </button>

        <span className="font-16r text-center text-black3">
          회원이 아니신가요?{" "}
          <Link
            href="/signup"
            className="text-[var(--primary)] underline hover:opacity-90"
          >
            회원가입하기
          </Link>
        </span>
      </form>
    </div>
  );
}
