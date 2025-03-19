export const CustomBtn = ({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  ...props
}) => {
  const baseStyle =
    "flex justify-center items-center rounded-lg cursor-pointer transition";

  const sizeStyles = {
    large: "w-[520px] h-[50px] text-lg",
    medium: "w-[256px] h-[54px] text-base",
    small: "w-[84px] h-[32px] text-sm rounded-sm",
    tabletSmall: "w-[72px] h-[30px] text-sm rounded-sm",
    mobileMedium: "w-[144px] h-[54px] text-md rounded-lg",
    mobileSmall: "w-[109px] h-[32px] text-sm rounded-sm",
  };

  const variantStyles = {
    primary: "bg-[#5534DA] text-white",
    primaryDisabled: "bg-[#9FA6B2] text-white",
    outline: "border border-[#D9D9D9] text-[#5534DA] ",
    outlineDisabled: "border border-[#D9D9D9] text-[#787486] ",
  };

  const finalStyle = `${baseStyle} ${sizeStyles[size]} ${
    disabled
      ? variant === "outlineDisabled"
        ? variantStyles.outlineDisabled
        : variant === "primaryDisabled"
          ? variantStyles.primaryDisabled
          : variantStyles.primaryDisabled
      : variantStyles[variant]
  }`;

  return (
    <button className={finalStyle} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
