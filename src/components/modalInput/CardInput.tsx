import { ChangeEvent, useRef } from "react";
import TextButton from "./TextButton";

export interface CardInputProps {
  value: string;
  placeholder?: string;
  hasButton?: boolean;
  className?: string;
  small?: boolean;
  onTextChange: (value: string) => void;
  onButtonClick: () => void;
}

export default function CardInput({
  value,
  onTextChange,
  placeholder = "",
  hasButton = false,
  onButtonClick = () => {},
  className = "",
  small = false,
}: CardInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(e.target.value);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full resize-none rounded-md border border-[var(--color-gray3)] focus:border-[var(--primary)] p-2 outline-none bg-white ${small ? "text-sm" : ""}`}
        style={{
          height: small ? "80px" : "120px", // 고정된 높이 설정
          overflowY: "auto", // 내용이 넘치면 스크롤 생성
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
          paddingBottom: hasButton ? "40px" : "8px", // 버튼과 겹치지 않도록 여백 추가
          boxSizing: "border-box", // padding과 border를 높이에 포함
        }}
      />
      {hasButton && (
        <TextButton
          disabled={value.trim().length === 0}
          color="secondary"
          buttonSize="xs"
          onClick={onButtonClick}
          className="absolute bottom-3 right-3 z-10 flex items-center justify-center border-gray-300 text-[#5534DA] cursor-pointer"
        >
          입력
        </TextButton>
      )}
    </div>
  );
}
