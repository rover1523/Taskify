import React from "react";

const headerDashboard = () => {
  const user = {
    nickname: "배유철",
    initials: "B",
  };

  return (
    <header className="w-full h-[50px] sm:h-[60px] md:h-[70px] flex items-center justify-center bg-white border-b-[1px] border-b-[#D9D9D9]">
      <div className="w-full flex items-center justify-between pl-[18vw]">
        <div className="flex items-center cursor-pointer relative">
          <p className="text-base text-black3 font-bold md:text-xl">
            내 대시보드
          </p>
        </div>

        <div className="flex items-center">
          <div className="flex space-x-[6px] md:space-x-[16px]">
            <button className="flex items-center justify-center w-[49px] h-[30px] md:w-[88px] md:h-[40px] rounded-[8px] border-[1px] border-[#D9D9D9] gap-[10px]">
              <img
                src="../svgs/settings.svg"
                alt="관리 아이콘"
                className="w-[20px] h-[20px] hidden md:block"
              />
              <span className="text-sm md:text-base text-gray1">관리</span>
            </button>

            <button className="flex items-center justify-center w-[73px] h-[30px] md:w-[116px] md:h-[40px] rounded-[8px] border-[1px] border-[#D9D9D9] gap-[10px]">
              <img
                src="../svgs/add-box.svg"
                alt="초대하기 아이콘"
                className="w-[20px] h-[20px] hidden md:block"
              />
              <span className="text-sm md:text-base text-gray1">초대하기</span>
            </button>
          </div>

          <div className="pl-[15px] pr-[20px] md:pl-[25px] md:pr-[30px] lg:pl-[30px] lg:pr-[35px]">
            <div className="flex items-center justify-center h-[34px] md:h-[38px] w-[1px] bg-[var(--color-gray3)]"></div>
          </div>

          <div className="flex items-center pr-[10px] md:pr-[30px] lg:pr-[80px] gap-[12px]">
            <div className="w-[38px] h-[38px] flex items-center justify-center rounded-full bg-[var(--color-green)] text-bold text-white">
              {
                user.initials //*profileImageUrl*//
              }
            </div>
            <span className="hidden md:block text-black3 md:text-base md:font-medium">
              {user.nickname}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default headerDashboard;
