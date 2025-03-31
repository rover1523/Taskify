import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";

interface StatusSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
}

const STATUS_OPTIONS = [
  { label: "To Do", color: "bg-[#9D8CFC]" },
  { label: "On Progress", color: "bg-[#9D8CFC]" },
  { label: "Done", color: "bg-[#9D8CFC]" },
];

export default function StatusSelect({
  value,
  onChange,
  label,
  required,
}: StatusSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedStatus = STATUS_OPTIONS.find((opt) => opt.label === value);

  return (
    <div className="inline-flex flex-col items-start gap-2.5 w-full max-w-[520px]">
      {label && (
        <p className="font-18m text-[var(--color-black)]">
          {label}
          {required && <span className="text-[var(--color-purple)]">*</span>}
        </p>
      )}

      <div className="relative w-full">
        {/* 현재 선택된 값 */}
        <div
          className="flex items-center justify-between h-[48px] px-4 border border-[var(--color-gray3)] rounded-md cursor-pointer focus-within:border-[var(--primary)]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            {selectedStatus ? (
              <>
                <span
                  className={clsx("w-2 h-2 rounded-full", selectedStatus.color)}
                ></span>
                <span className="font-18r">{selectedStatus.label}</span>
              </>
            ) : (
              <span className="font-18r text-[var(--color-gray2)]">
                상태를 선택해주세요
              </span>
            )}
          </div>
          <Image
            src="/svgs/arrow-down.svg"
            width={20}
            height={20}
            alt="dropdown"
          />
        </div>

        {/* 드롭다운 리스트 */}
        {isOpen && (
          <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-[var(--color-gray3)] rounded-md shadow-lg z-10">
            {STATUS_OPTIONS.map((status) => (
              <li
                key={status.label}
                onClick={() => {
                  onChange(status.label);
                  setIsOpen(false);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-[var(--color-gray1)] flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={clsx("w-2 h-2 rounded-full", status.color)}
                  ></span>
                  <span className="text-sm">{status.label}</span>
                </div>
                {value === status.label && (
                  <span className="text-[var(--primary)]">✔</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
