import React from "react";

const headerDefault = () => {
  return (
    <header className="w-full h-[50px] md:h-[70px] sm:h-[60px] flex items-center justify-center bg-white border-b-[1px] border-b-[#D9D9D9]">
      <div className="w-full flex items-center justify-between px-[16px] lg:px-[70px] md:px-[40px] sm:px-[24px]">
        <div className="flex items-center cursor-pointer relative">
          <img
            src="../svgs/logo-large.svg"
            alt="Taskify Logo"
            className="h-[39px] hidden md:block"
          />
          <img
            src="../svgs/small-logo.svg"
            alt="Taskify Mobile Logo"
            className="h-[27px] block md:hidden"
          />
        </div>
        <div className="flex space-x-[24px] md:space-x-[36px]">
          <button className="text-sm md:text-base text-black3">로그인</button>
          <button className="text-sm md:text-base text-black3">회원가입</button>
        </div>
      </div>
    </header>
  );
};

export default headerDefault;
