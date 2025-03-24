import { useState, useEffect } from "react";
import Input from "@/components/input/Input";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [nickName, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isPasswordMatch, setIspasswordMatch] = useState(true);

  const handlePasswordCheckChange = (value: string) => {
    setPasswordCheck(value);
    setIspasswordMatch(value === password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[var(--color-gray5)]">
      <div className="text-center mb-[40px]">
        <img
          src="../svgs/main-logo.svg"
          alt="태스키파이 로고 이미지"
          className="w-[200px] h-[280px] relative"
        />
        <p className="font-20m text-black3">첫 방문을 환영합니다!</p>
      </div>

      <form className="flex flex-col w-[350px] md:w-[520px] gap-[20px] font-16r text-black3">
        <Input
          type="email"
          name="email"
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          onChange={setEmail}
          pattern="^[\w.-]+@[\w.-]+\.\w{2,}$"
          invalidMessage="올바른 이메일 주소를 입력해 주세요"
        />

        <Input
          type="text"
          name="nickname"
          label="닉네임"
          placeholder="닉네임을 입력해 주세요"
          onChange={setNickname}
        />

        <Input
          type="password"
          name="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요"
          onChange={setPassword}
          pattern=".{8,}"
          invalidMessage="비밀번호는 8자 이상이어야 해요"
        />

        <Input
          type="password"
          name="passwordCheck"
          label="비밀번호 확인"
          placeholder="비밀번호를 한번 더 입력해 주세요"
          onChange={handlePasswordCheckChange}
          pattern="{password}"
          invalidMessage={
            isPasswordMatch ? "" : "비밀번호가 일치하지 않습니다."
          }
        />

        <span font-16r text-black3>
          이용약관에 동의합니다.
        </span>

        <button
          type="submit"
          className={`w-full h-[50px] rounded-[8px] text-white font-18m transition ${
            email && password
              ? "bg-[var(--primary)] cursor-pointer hover:opacity-90}"
              : "bg-[var(--color-gray2)] cursor-not-allowed"
          }`}
          disabled={!password || !passwordCheck || !isPasswordMatch}
        >
          가입하기
        </button>

        <span className="font-16r text-center text-black3">
          회원이 아니신가요?{" "}
          <a
            href="/signup"
            className="text-[var(--primary)] underline hover:opacity-90"
          >
            회원가입하기
          </a>
        </span>
      </form>
    </div>
  );
}
