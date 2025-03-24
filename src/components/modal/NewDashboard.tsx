import { useState, useEffect } from "react";
import Input from "../input/Input";
import Image from "next/image";
import axios from "axios";

export default function NewDashboard({ onClose }: { onClose?: () => void }) {
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const colors = ["#7ac555", "#760DDE", "#FF9800", "#76A5EA", "#E876EA"];

  const token = process.env.NEXT_PUBLIC_API_TOKEN;

  const handleSubmit = async () => {
    const payload = {
      title,
      color: selected !== null ? colors[selected] : "",
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `https://sp-taskify-api.vercel.app/13-4/dashboards`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("대시보드 생성 성공:", response.data);

      onClose?.(); // 모달 닫기
    } catch (error) {
      console.error("대시보드 생성 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:w-[584px] sm:h-[344px] w-[327px] h-[312px] bg-white sm:rounded-[16px] rounded-[8px] shadow-md p-[24px] flex flex-col">
      <h2 className="text-sm sm:text-[24px] font-bold">새로운 대시보드</h2>
      <Input
        type="text"
        onChange={setTitle}
        label="대시보드 이름"
        labelClassName="text-lg sm:text-base text-black3 mt-6"
        placeholder="뉴프로젝트"
        className="max-w-[620px] mb-1"
      />

      <div className="mt-3 flex relative">
        {colors.map((color, index) => (
          <div key={index} className="relative">
            <button
              className="cursor-pointer w-[30px] h-[30px] rounded-full mr-2"
              style={{ backgroundColor: color }}
              onClick={() => setSelected(index)}
            />
            {selected === index && (
              <Image
                src="/svgs/check.svg"
                alt="선택표시 이미지"
                width={23}
                height={23}
                className="absolute top-4 left-4 transform -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={onClose}
          className="cursor-pointer sm:w-[256px] sm:h-[54px] w-[295px] h-[54px] rounded-[8px] border border-[var(--color-gray3)] text-[var(--color-gray1)]"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          disabled={!title || selected === null} // 🔥 조건 추가
          className={`cursor-pointer sm:w-[256px] sm:h-[54px] w-[295px] h-[54px] rounded-[8px] 
                      border border-[var(--color-gray3)] text-[var(--color-white)] 
          ${!title || selected === null ? "bg-gray-300 cursor-not-allowed" : "bg-[var(--primary)]"}`}
        >
          생성
        </button>
      </div>
    </div>
  );
}
