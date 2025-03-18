// Button.jsx
export const CustomButton = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  ...props
}) => {
  const baseStyle =
    "flex justify-center items-center font-bold rounded-lg cursor-pointer transition";

  const sizeStyles = {
    small: "w-[84px] h-[32px] text-lg",
    medium: "w-[128px] h-[48px] text-base",
    large: "w-[351px] h-[50px] text-lg",
    extraLarge: "w-[520px] h-[50px] text-lg",
  };

  const variantStyles = {
    primary: "bg-[#5534DA] text-white",
    outline: "border border-[#D9D9D9] text-[#5534DA] ",
    disabled: "border border-[#D9D9D9] text-[#787486] ",
  };

  const finalStyle = `${baseStyle} ${sizeStyles[size]} ${disabled ? variantStyles.disabled : variantStyles[variant]}`;

  return (
    <button className={finalStyle} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
