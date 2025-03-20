import { useState, ChangeEvent } from "react";
import Image from "next/image";

function EmptyInvitations() {
  return (
    <div className="relative sm:w-[960px] w-[260px] sm:h-[390px] h:[327px] rounded-[16px] sm:p-[24px_40px_120px_40px] p-[24px_20px_80px_20px] bg-white shadow-md mx-auto">
      <div className="mb-[16px] flex flex-col justify-center items-center h-[calc(100%-40px)]">
        <Image
          src="/svgs/unsubscribe.svg"
          alt="대시보드 없을때 아이콘"
          width={60}
          height={60}
          className="sm:w-[100px] sm:h-[100px] w-[60px] h-[60px] mb-2"
        />

        <p className="sm:text-lg text-xs leading-[26px] text-[var(--color-gray2)] whitespace-nowrap">
          아직 초대받은 대시보드가 없어요
        </p>
      </div>
    </div>
  );
}

function InvitedList({ searchTitle }: { searchTitle: string }) {
  const invitedData = [
    { title: "프로덕트 디자인", nickname: "손동희" },
    { title: "새로운 기획 문서", nickname: "안귀영" },
    { title: "유닛 A", nickname: "장혁" },
    { title: "유닛 B", nickname: "강나무" },
    { title: "유닛 C", nickname: "김태현" },
    { title: "유닛 D", nickname: "김태현" },
  ];

  const filteredData = invitedData.filter((invite) =>
    (invite.title || invite.nickname)
      .toLowerCase()
      .includes(searchTitle.toLowerCase())
  );

  return (
    <div className="relative bg-white w-[1022px] h-[458px] mx-auto mt-[24px] ">
      {filteredData.length > 0 && (
        <div className="flex w-[798px] h-[26px] justify-between items-center pl-[43px] pr-[76px]">
          <p className="font-normal text-[var(--color-gray2)]">이름</p>
          <p className="font-normal text-[var(--color-gray2)]">초대자</p>
          <p className="font-normal text-[var(--color-gray2)]">수락여부</p>
        </div>
      )}

      <div>
        {filteredData.length > 0 ? (
          filteredData.map((invite, index) => (
            <div
              key={index}
              className="grid grid-cols-3 p-2 border-b items-center"
            >
              <p>{invite.title || invite.title}</p>
              <p>{invite.nickname || invite.nickname}</p>
              <div className="flex justify-center gap-2">
                <button className="bg-indigo-600 text-white px-3 py-1 rounded-md">
                  수락
                </button>
                <button className="border px-3 py-1 rounded-md">거절</button>
              </div>
            </div>
          ))
        ) : (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
            <Image
              src="/svgs/search.svg"
              alt="대시보드 없을때 아이콘"
              width={60}
              height={60}
              className="sm:w-[100px] sm:h-[100px] w-[60px] h-[60px] mb-2"
            />

            <p className="sm:text-lg text-xs leading-[26px] text-[var(--color-gray2)] whitespace-nowrap">
              검색결과가 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function InvitedDashBoard() {
  const [searchTitle, setSearchTitle] = useState("");

  /* 검색창 input */
  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
    console.log("search input 값: ", event.target.value);
  };

  return (
    <div>
      <div className="relative bg-white p-6 rounded-lg shadow-md w-[1022px] h-[650px] max-w-none mx-auto">
        <div className="relative w-[966px] h-[104px]">
          <div className="flex justify-between items-center mb-[32px]">
            <p className="text-xl sm:text-2xl font-bold">초대받은 대시보드</p>
          </div>
          <div className="relative w-[966px]">
            <input
              id="title"
              placeholder="검색"
              type="text"
              value={searchTitle}
              onChange={handleSearchInputChange}
              className="text-[var(--color-gray2)] w-full h-[40px] px-[40px] py-[6px] border border-[#D9D9D9] bg-white rounded-[6px] placeholder-gray-400 outline-none"
            />
            <Image
              src="/svgs/search.svg"
              alt="검색 아이콘"
              width={20}
              height={20}
              className="absolute left-[12px] top-1/2 transform -translate-y-1/2"
            />
          </div>
          <InvitedList searchTitle={searchTitle} />
        </div>
      </div>
    </div>
  );
}
