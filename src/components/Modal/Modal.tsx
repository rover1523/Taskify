"use client";

import { createPortal } from "react-dom";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "outline";
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  buttons?: ButtonProps[];
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  buttons,
}: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록 설정
      >
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <div className="mb-4">{children}</div>
        <div className="flex justify-end gap2">
          {buttons?.map((button, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded ${
                button.variant === "primary"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }transition`}
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
