import { useState } from "react";
import Input from "../input/Input";
import Image from "next/image";
import axios from "axios";
interface Dashboard {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

export default function NewDashboard({
  onClose,
  onCreate,
}: {
  onClose?: () => void;
  onCreate?: (newDashboard: Dashboard) => void;
}) {
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const colors = ["#7ac555", "#760DDE", "#FF9800", "#76A5EA", "#E876EA"];
  const token = localStorage.getItem("accessToken");

  const handleSubmit = async () => {
    const payload = {
      title,
      color: selected !== null ? colors[selected] : "",
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}13-4/dashboards`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onCreate?.(response.data);
      onClose?.();
    } catch (error) {
      alert("대시보드 생성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/35 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[327px] sm:w-[584px] sm:h-[344px]">
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
            disabled={!title || selected === null}
            className={`cursor-pointer sm:w-[256px] sm:h-[54px] w-[295px] h-[54px] rounded-[8px] 
            border border-[var(--color-gray3)] text-[var(--color-white)] 
            ${!title || selected === null ? "bg-gray-300 cursor-not-allowed" : "bg-[var(--primary)]"}`}
          >
            {loading ? "생성 중..." : "생성"}
          </button>
        </div>
      </div>
    </div>
  );
}
