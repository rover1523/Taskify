import { useState } from "react";
import Input from "../input/Input";

export default function ChangePassword() {
  const [passwd, setPw] = useState("");
  const [newpw, setNewPw] = useState("");
  const [checknewpw, setCheckNewPw] = useState("");

  // 모든 필드가 입력되고, 새 비밀번호와 확인이 일치해야 버튼 활성화
  const isDisabled = !passwd || !newpw || !checknewpw || newpw !== checknewpw;

  return (
    <div className="sm:w-[672px] sm:h-[466px] w-[284px] h-[454px] bg-white rounded-[16px] shadow-md p-[24px] flex flex-col">
      {/* 제목 */}
      <h2 className="text-[18px] sm:text-[24px] font-bold mb-4">
        비밀번호 변경
      </h2>

      {/* 입력 input */}
      <div>
        <div className="mb-5">
          <Input
            type="email"
            name="email"
            label="이메일"
            labelClassName="font-16r"
            placeholder="이메일을 입력하세요"
            onChange={setPw}
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            invalidMessage="유효한 이메일 주소를 입력하세요."
            className="max-w-[620px]"
          />
          <Input
            type="email"
            name="email"
            label="이메일"
            labelClassName="font-16r"
            placeholder="이메일을 입력하세요"
            onChange={setPw}
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            invalidMessage="유효한 이메일 주소를 입력하세요."
          />
          <label className="mb-2 text-sm sm:text-base text-black mt-3">
            새 비밀번호 확인
          </label>
          <input
            type="password"
            value={checknewpw}
            onChange={(e) => setCheckNewPw(e.target.value)}
            className="mt-3 w-full h-[44px] px-[16px] py-[10px] border border-gray-300 rounded-[8px]"
          />
        </div>
      </div>

      {/* 변경 버튼 */}
      <button
        className={`cursor-pointer w-full sm:w-[624px] h-[54px] 
          rounded-[8px] text-lg font-medium mt-6 
          ${isDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-[#5A3FFF] text-white"}`}
        disabled={isDisabled}
      >
        변경
      </button>
    </div>
  );
}
