import { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";

function EmptyInvitations() {
  return (
    <div className="relative sm:w-[960px] w-[260px] sm:h-[390px] h:[327px]  rounded-[16px] sm:p-[24px_40px_120px_40px] p-[24px_20px_80px_20px]  bg-white shadow-md  mx-auto">
      <div className="flex justify-between ">
        <p className="sm:text-2xl text-sm font-bold mb-4 ">초대받은 대시보드</p>
      </div>

      <div className="mb-[16px] flex flex-col justify-center items-center h-[calc(100%-40px)]">
        <img
          className="sm:w-[100px] sm:h-[100px] w:-[60px] h:-[60px] mb-2"
          src="/svgs/unsubscribe.svg"
          alt="대시보드 없을때 아이콘"
        />
        <p className="sm:text-lg text-xs leading-[26px] text-[var(--color-gray2)] whitespace-nowrap">
          아직 초대받은 대시보드가 없어요
        </p>
      </div>
    </div>
  );
}

function InvitedList() {
  return (
    <div className="relative bg-white w-[1022px] h-[458px]  mx-auto mt-[24px]">
      <div className="flex w-[798px] h-[26px] justify-between items-center pl-[43px] pr-[76px]">
        <p className="font-normal text-[var(--color-gray2)]">이름</p>
        <p className="font-normal text-[var(--color-gray2)]">초대자</p>
        <p className="font-normal text-[var(--color-gray2)]">수락여부</p>
      </div>
    </div>
  );
}

export default function InvitedDashBoard() {
  const [searchTitle, setSearchTitle] = useState("");

  /* 검색창 input */
  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
    // 추후 삭제
    console.log("search input 값: ", event.target.value);
  };

  return (
    <div>
      <div className="relative   bg-white p-6 rounded-lg shadow-md w-[1022px] h-[650px] max-w-none mx-auto">
        <div className="relative w-[966px] h-[104px]">
          <div className="flex justify-between items-center mb-[32px]">
            <p className="text-xl sm:text-2xl font-bold">초대받은 대시보드</p>
          </div>
          <div className="p-[6px 16px 6px 16px] relative w-[966px]">
            <input
              id="title"
              placeholder="검색"
              type="text"
              value={searchTitle}
              onChange={handleSearchInputChange}
              className="text-[var(--color-gray2)] w-full h-[40px] px-[40px] py-[6px] border border-[#D9D9D9] bg-white rounded-[6px]  placeholder-gray-400 outline-none"
            />
            <img
              src="/svgs/search.svg"
              alt="검색 아이콘"
              className="absolute left-[12px] top-1/2 transform -translate-y-1/2 w-[20px] h-[20px]"
            />
          </div>
          <InvitedList />
        </div>
      </div>
    </div>
  );
}
