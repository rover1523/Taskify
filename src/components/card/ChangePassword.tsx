import { useState, useEffect } from "react";
import Input from "../input/Input";

export default function ChangePassword() {
  const [passwd, setPw] = useState("");
  const [newpw, setNewPw] = useState("");
  const [checknewpw, setCheckNewPw] = useState("");
  const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);

  // 비밀번호 확인 필드 값이 변경될 때마다 검증
  useEffect(() => {
    if (checknewpw) {
      setIsPasswordMismatch(newpw !== checknewpw);
    }
  }, [newpw, checknewpw]);

  const isDisabled =
    !passwd || !newpw || !checknewpw || isPasswordMismatch || passwd.length < 8;

  return (
    <div className="sm:w-[672px] sm:h-[466px] w-[284px] h-[454px] bg-white rounded-[16px] shadow-md p-[24px] flex flex-col">
      <h2 className="text-[18px] sm:text-[24px] font-bold mb-4">
        비밀번호 변경
      </h2>

      <div>
        <div className="-mt-2">
          <Input
            type="password"
            name="password"
            label="비밀번호"
            labelClassName="font-16r"
            placeholder="비밀번호 입력"
            onChange={setPw}
            pattern=".{8,}"
            invalidMessage="8자 이상 입력해주세요."
            className="max-w-[620px] mb-1"
          />
          <Input
            type="password"
            name="password"
            label="새 비밀번호"
            labelClassName="font-16r"
            placeholder="새 비밀번호 입력"
            onChange={setNewPw}
            pattern=".{8,}"
            invalidMessage="8자 이상 입력해주세요."
            className="max-w-[620px] mb-1"
          />
          <Input
            type="password"
            name="passwordCheck"
            label="새 비밀번호 확인"
            labelClassName="font-16r"
            placeholder="새 비밀번호 입력"
            onChange={setCheckNewPw}
            pattern=".{8,}"
            invalidMessage="8자 이상 입력해주세요."
            className="max-w-[620px] mb-1"
          />
        </div>
      </div>

      <button
        className={`mt-2.5 cursor-pointer w-full sm:w-[624px] h-[54px] 
          rounded-[8px] text-lg font-medium  
          ${isDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-[#5A3FFF] text-white"}`}
        disabled={isDisabled}
      >
        변경
      </button>
    </div>
  );
}
