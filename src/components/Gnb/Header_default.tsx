import React from "react";

const HeaderDefault = () => {
  return (
    <header className="w-full h-[70px] md:h-[70px] sm:h-[60px] flex items-center justify-center bg-white border-b-[1px] border-b-[#D9D9D9]">
      <div className="w-full flex items-center justify-between lg:px-[70px] md:px-[40px] sm:px-[24px]">
        <div className="flex items-center space-x-2 cursor-pointer relative">
          <img
            src="../svgs/large-logo.svg"
            alt="Taskify Logo"
            className="h-[39px] hidden md:block"
          />
          <img
            src="../svgs/small-logo.svg"
            alt="Taskify Mobile Logo"
            className="h-[27px] block md:hidden"
          />
        </div>
        <div className="flex space-x-4">
          <button className="font-16r text-black3">로그인</button>
          <button className="font-16r text-black3">회원가입</button>
        </div>
      </div>
    </header>
  );
};

export default HeaderDefault;
