import React from "react";

const HeaderDefault = () => {
  return (
    <header className="w-full h-[70px] flex items-center justify-center bg-white border-b-[1px] border-b-[#D9D9D9]">
      <div className="w-[1780px] h-[39px] flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer">
          <img
            src="../svgs/large-logo.svg"
            alt="Taskify Logo"
            className="h-[39px]"
          />
        </div>
        <div className="flex space-x-4 text-gray600">
          <button className="font-16r text-black">로그인</button>
          <button className="font-16r text-black">회원가입</button>
        </div>
      </div>
    </header>
  );
};

export default HeaderDefault;
