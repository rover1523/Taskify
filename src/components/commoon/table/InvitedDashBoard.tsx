import { useState, ChangeEvent } from "react";
import Image from "next/image";

function EmptyInvitations() {
  return (
    <div className="relative sm:w-[960px] w-[260px] sm:h-[390px] h:[327px] rounded-[16px] sm:p-[24px_40px_120px_40px] p-[24px_20px_80px_20px] bg-white shadow-md mx-auto">
      <div className="mb-[16px] flex flex-col justify-center items-center h-[calc(100%-40px)]">
        <Image
          src="/svgs/unsubscribe.svg"
          alt="초대받은 대시보드 없을때 아이콘"
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

  /* 검색 */
  const filteredData = invitedData.filter(
    (invite) =>
      (invite.title &&
        invite.title.toLowerCase().includes(searchTitle.toLowerCase())) ||
      (invite.nickname &&
        invite.nickname.toLowerCase().includes(searchTitle.toLowerCase()))
  );

  return (
    <div className="relative bg-white w-[1022px] h-[458px] mx-auto mt-[40px]  ">
      {filteredData.length > 0 && (
        <div className="p-6 flex w-[900px] h-[26px] justify-start items-center pl-[43px] pr-[76px] gap-x-[50px]">
          <p className="font-normal text-[var(--color-gray2)] ml-5.5">이름</p>
          <p className="font-normal text-[var(--color-gray2)] ml-54">초대자</p>
          <p className="font-normal text-[var(--color-gray2)] ml-72">
            수락여부
          </p>
        </div>
      )}

      <div>
        {filteredData.length > 0 ? (
          filteredData.map((invite, index) => (
            <div
              key={index}
              className="pb-5 mb-[20px] w-[1022px] h-[52px] grid grid-cols-[1fr_1fr_1fr]  border-b border-[var(--color-gray4)] items-center"
            >
              <p className="flex justify-cneter ml-16 mt-1">{invite.title}</p>
              <p className="justify-cneter ml-4.5 mt-1">{invite.nickname}</p>
              <div className="flex gap-2 mt-1">
                <button className="cursor-pointer bg-[var(--primary)] text-white px-3 py-1 rounded-md w-[84px] h-[32px]">
                  수락
                </button>
                <button className="cursor-pointer border px-3 py-1 rounded-md w-[84px] h-[32px] text-[var(--primary)] border-[var(--color-gray3)]">
                  거절
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
            <Image
              src="/svgs/unsubscribe.svg"
              alt="검색 결과 없을때 아이콘"
              width={60}
              height={60}
              className="sm:w-[100px] sm:h-[100px] w-[60px] h-[60px] mb-2"
            />

            <p className="sm:text-lg text-xs leading-[26px] text-[var(--color-gray2)] whitespace-nowrap">
              <span className="text-[var(--primary)] mr-1">{searchTitle}</span>
              대시보드가 없습니다.
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
      <div className="relative bg-white rounded-lg shadow-md w-[1022px] h-[650px] max-w-none mx-auto">
        <div className="p-6 relative w-[966px] h-[104px]">
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
        </div>
        <InvitedList searchTitle={searchTitle} />
      </div>
    </div>
  );
}
