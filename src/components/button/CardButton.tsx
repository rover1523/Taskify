import React from "react";
import clsx from "clsx";
import Image from "next/image";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

const CardButton: React.FC<ButtonProps> = ({
  fullWidth,
  className,
  children = "비브리지",
  ...props
}) => {
  return (
    <button
      className={clsx(
        "flex justify-center items-center gap-[10px] bg-white transition-all",
        "rounded-lg px-4 py-3 font-semibold",
        "border border-gray-300 hover:border-purple-500",
        fullWidth ? "w-full" : "w-[260px] md:w-[247px] lg:w-[332px]", // 반응형 너비
        "h-[58px] md:h-[68px] lg:h-[70px]", // 반응형 높이
        "mt-[10px] md:mt-[16px] lg:mt-[20px]", // 여백
        "text-lg md:text-2lg lg:text-2lg",
        className
      )}
      {...props}
    >
      <span className="font-semibold">{children}</span>
      <Image
        src="/svgs/icon-crown.svg"
        alt="crown Icon"
        width={32}
        height={32}
        className="w-[30px] h-[30px] p-1 rounded-md"
      />
    </button>
  );
};

export default CardButton;
