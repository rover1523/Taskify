import React from "react";

interface PaginationBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction?: "left" | "right";
  disabled?: boolean;
}

export const PaginationBtn: React.FC<PaginationBtnProps> = ({
  direction = "left",
  disabled = false,
  ...props
}) => {
  const baseStyle =
    "w-[40px] h-[40px] flex justify-center items-center border border-[#D9D9D9] rounded-md text-[16px] font-medium cursor-pointer transition";

  const enabledTextColor = "text-[#787486] hover:bg-gray-100";
  const disabledTextColor = "text-[#D9D9D9] ";

  const finalStyle = `${baseStyle} ${disabled ? disabledTextColor : enabledTextColor}`;

  return (
    <button className={finalStyle} disabled={disabled} {...props}>
      {direction === "left" ? "<" : ">"}
    </button>
  );
};
