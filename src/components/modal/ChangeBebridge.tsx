import { useState } from "react";
import Input from "../input/Input";
import Image from "next/image";

export default function ChangeBebridge() {
  const [selected, setSelected] = useState<number | null>(null);

  const colors = ["#7ac555", "#760DDE", "#FF9800", "#76A5EA", "#E876EA"];

  return (
    <div className="sm:w-[584px] sm:h-[344px] w-[327px] h-[312px] bg-white sm:rounded-[16px] rounded-[8px] shadow-md p-[24px] flex flex-col">
      <h2 className="text-sm sm:text-[24px] font-bold">비브리지</h2>
      <Input
        type="text"
        label="대시보드 이름"
        labelClassName="text-lg sm:text-base text-black3 mt-6"
        placeholder="뉴프로젝트"
        className="max-w-[620px] mb-1"
      />
      <div className="flex mt-3">
        {colors.map((color, index) => (
          <div key={index} className="relative">
            <button
              className={`cursor-pointer w-[30px] h-[30px] rounded-[15px] mr-2`}
              style={{ backgroundColor: color }}
              onClick={() => setSelected(index)}
            />
            {selected === index && (
              <Image
                src="/svgs/check.svg"
                alt="선택됨"
                width={23}
                height={23}
                className=" ursor-pointer absolute top-4 left-3.5 transform -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 flex ">
        <button className="cursor-pointer sm:w-[564px] sm:h-[54px] w-[252px] h-[54px] rounded-[8px] border border-[var(--color-gray3)] bg-[var(--primary)] text-[var(--color-white)]">
          변경
        </button>
      </div>
    </div>
  );
}
