import { useState } from "react";
import RandomProfile from "./RandomProfile";

const MemberList = () => {
  const [members, setMembers] = useState([
    // 나중에 api 데이터로 변경
    { name: "정만철" },
    { name: "김태순" },
    { name: "최주협" },
    { name: "윤지현" },
    { name: "박영수" },
    { name: "이민정" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 한 페이지당 2명씩 표시
  const totalPages = Math.ceil(members.length / itemsPerPage);

  // 현재 페이지에 해당하는 데이터만 가져오기
  const paginatedMembers = members.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* 삭제 기능 */
  const handleDelete = (name: string) => {
    setMembers(members.filter((member) => member.name !== name));
  };

  // 페이지 이동
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md h-[404px] w-[620px]">
      <div className="flex justify-between items-center">
        <p className="text-[24px] font-bold">구성원</p>

        {/* 페이지 정보 표시 */}
        <div className="flex items-center">
          <p className="text-sm text-[#333236] mt-4 text-center mr-[15px] relative -translate-y-[10px]">
            {currentPage} 페이지 중 {totalPages}
          </p>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            {/* 왼쪽 버튼 (첫 페이지면 비활성화) */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`cursor-pointer w-10 h-10 flex justify-center items-center border-r border-gray-300 hover:bg-gray-100 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <img
                src="/images/arrow-backward-white.svg"
                alt="왼쪽"
                className="w-5 h-5"
              />
            </button>

            {/* 오른쪽 버튼 (마지막 페이지면 비활성화) */}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`cursor-pointer w-10 h-10 flex justify-center items-center hover:bg-gray-100 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <img
                src="/images/arrow-forward-white.svg"
                alt="오른쪽"
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>
      </div>

      <p className="text-[16px] text-[#9FA6B2] mt-6">이름</p>

      <ul>
        {paginatedMembers.map((member, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-4 ${
              index !== paginatedMembers.length - 1
                ? "border-b border-[#EEEEEE]"
                : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <RandomProfile name={member.name} index={index} />
              <p className="text-[16px] font-normal leading-[26px]">
                {member.name}
              </p>
            </div>
            <button
              onClick={() => handleDelete(member.name)}
              className="font-medium text-[14px] h-[32px] w-[84px] border border-[#D3D6DB] text-[#5534DA] px-3 py-1 rounded-md hover:bg-[#E5E7EB]"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
