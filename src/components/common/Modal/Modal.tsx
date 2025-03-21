"use client";

import { createPortal } from "react-dom";
import { CustomBtn } from "../Button/CustomBtn";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "outline";
  className?: string; // 버튼 스타일을 외부에서 지정 가능
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  buttons?: ButtonProps[];
  className?: string;
  contentClassName?: string;
  buttonContainerClassName?: string;
  width?: string; // 모달 너비 (사용자가 지정 가능, 기본값 있음)
  height?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  buttons,
  className = "",
  contentClassName = "",
  buttonContainerClassName = "",
  width = "w-[568px]",
  height = "h-[266px]",
}: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow-lg p-6 ${width} ${height} ${className}`}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록 설정
      >
        {title && <h2 className="text-xl font-semibold ">{title}</h2>}
        {/* 내용 영역 */}
        <div className={`${contentClassName} flex flex-col gap-4`}>
          {children}
        </div>
        {/* 버튼영역 */}
        <div className="mt-6 flex flex-col gap-2">
          <div
            className={`flex justify-center gap-2 ${buttonContainerClassName}`}
          >
            {buttons?.map((button, index) => (
              <CustomBtn
                key={index}
                onClick={button.onClick}
                variant={button.variant ?? "primary"} // 기본값 fallback
                className={`px-4 ${button.className || ""}`}
              >
                {button.label}
              </CustomBtn>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
