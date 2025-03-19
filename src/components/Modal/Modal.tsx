"use client";

import { createPortal } from "react-dom";

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
  className?: string; // 모달 컨테이너 스타일을 외부에서 지정 가능
  contentClassName?: string; // 모달 내부 컨텐츠 영역 스타일
  buttonContainerClassName?: string; // 버튼 컨테이너 스타일
}

export function Modal({
  //혜진Todo
  isOpen,
  onClose,
  title,
  children,
  buttons,
  className = "",
  contentClassName = "",
  buttonContainerClassName = "",
}: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow-lg ${className}`} // 외부에서 스타일 지정 가능
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록 설정
      >
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <div className={`${contentClassName}`}>{children}</div>
        <div
          className={`flex justify-center gap-2 ${buttonContainerClassName}`}
        >
          {buttons?.map((button, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded ${
                button.variant === "primary"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              } ${button.className}`} // 버튼 스타일을 외부에서 지정 가능
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
