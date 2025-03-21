// chip.tsx
import React from "react";
import { TChipProps } from "./Chip.type";

const sizeStyles = {
  large: "h-[22px] text-[12px]",
  small: "h-[20px] text-[10px]",
};

const colorStyles = {
  green: "bg-[#E7F7DB] text-[#86D549]",
  purple: "bg-[var(--violetlight)] text-[var(--violet)]",
  pink: "bg-[#F7DBF0] text-[#D549B6]",
  orange: "bg-[#F9EEE3] text-[#D58D49]",
  blue: "bg-[#DBE6F7] text-[#4981D5]",
  gray: "bg-[var(--gray200)] text-[var(--gray500)]",
};

export default function Chip({ children, size, color }: TChipProps) {
  const sizeClass = sizeStyles[size];
  const colorClass = colorStyles[color];

  return (
    <span
      className={`inline-flex items-center px-[7px] rounded-[4px] ${sizeClass} ${colorClass}`}
    >
      {children}
    </span>
  );
}
