import { useState } from "react";
import { useRouter } from "next/router";
import Input from "../input/Input";
import Image from "next/image";
import axios from "axios";

export default function InviteDashboard({ onClose }: { onClose?: () => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { dashboardId } = router.query;
  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    const payload = {
      email,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `https://sp-taskify-api.vercel.app/13-4/dashboards/${dashboardId}/invitations`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("초대 성공:", response.data);
      alert("대시보드가 성공적으로 생성되었습니다.");
      console.log(loading);

      onClose?.(); // 모달 닫기
    } catch (error) {
      console.error("대시보드 생성 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/35 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[327px] sm:w-[568px] sm:h-[279px]">
        <div className="flex justify-between items-center">
          <h2 className="text-sm sm:text-[24px] font-bold">초대하기</h2>
          <Image
            src="/svgs/close-white.svg"
            alt="닫기"
            width={25}
            height={25}
            className="cursor-pointer"
            onClick={onClose}
          ></Image>
        </div>
        <Input
          type="text"
          onChange={setEmail}
          label="이메일"
          labelClassName="text-lg sm:text-base text-black3 mt-6"
          placeholder="이메일을 입력해주세요"
          className="max-w-[620px] mb-1"
        />

        <div className="mt-8 flex justify-between">
          <button
            onClick={onClose}
            className="cursor-pointer sm:w-[256px] sm:h-[54px] w-[295px] h-[54px] rounded-[8px] border border-[var(--color-gray3)] text-[var(--color-gray1)]"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={!email || !isValidEmail(email)}
            className={`cursor-pointer sm:w-[256px] sm:h-[54px] w-[295px] h-[54px] rounded-[8px] 
                border border-[var(--color-gray3)] text-[var(--color-white)] 
            ${!email || !isValidEmail(email) ? "bg-gray-300 cursor-not-allowed" : "bg-[var(--primary)]"}`}
          >
            생성
          </button>
        </div>
      </div>
    </div>
  );
}
