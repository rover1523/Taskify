import React from "react";

const HeaderDashboard = () => {
  return (
    <header className="w-full h-[50px] md:h-[70px] sm:h-[60px] flex items-center justify-center bg-white border-b-[1px] border-b-[#D9D9D9]">
      <div className="w-full flex items-center justify-between px-[16px] lg:px-[70px] md:px-[40px] sm:px-[24px]">
        <div className="flex items-center space-x-2 cursor-pointer relative">
          <p className="text">내 대시보드</p>
        </div>
        <div className="flex space-x-[6px] md:space-x-[16px]">
          <button className="w-[49px] h-[30px] lg:w-[88px] lg:h-[40px] md:w-[88px] md:h-[40px] rounded-[8px] border-[1px] border-[#D9D9D9] gap-[10px]">
            <img
              src="../svgs/settings.svg"
              alt="관리 아이콘"
              className="w-[20px] h-[20px] hidden md:block"
            />
            <span className="text-sm md:text-base text-gray1">관리</span>
          </button>
          <button className="w-[73px] h-[30px] md:w-[116px] md:h-[40px] rounded-[8px] border-[1px] border-[#D9D9D9] gap-[10px]">
            <img
              src="../svgs/add-box.svg"
              alt="초대하기 아이콘"
              className="w-[20px] h-[20px] hidden md:block"
            />
            <span className="text-sm md:text-base text-gray1">초대하기</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
