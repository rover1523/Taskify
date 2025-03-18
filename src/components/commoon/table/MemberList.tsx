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
  const itemsPerPage = 4;
  const totalPages = Math.ceil(members.length / itemsPerPage);

  const paginatedMembers = members.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (name: string) => {
    setMembers(members.filter((member) => member.name !== name));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md max-w-md w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <p className="text-lg sm:text-xl font-bold">구성원</p>

        {/* 페이지네이션 */}
        <div className="flex items-center">
          <p className=" relative -translate-y-[10px] text-sm text-gray-700 mt-4 text-center mr-3">
            {currentPage} 페이지 중 {totalPages}
          </p>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`w-10 h-10 flex justify-center items-center border-r border-gray-300 hover:bg-gray-100 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <img
                src="/images/arrow-backward-white.svg"
                alt="왼쪽"
                className="w-5 h-5"
              />
            </button>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 flex justify-center items-center hover:bg-gray-100 ${
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

      {/* 구성원 리스트 */}
      <p className="text-sm sm:text-base text-gray-500 mt-6">이름</p>

      <ul>
        {paginatedMembers.map((member, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-4 ${
              index !== paginatedMembers.length - 1
                ? "border-b border-gray-200"
                : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <RandomProfile name={member.name} index={index} />
              <p className="text-sm sm:text-base">{member.name}</p>
            </div>
            <button
              onClick={() => handleDelete(member.name)}
              className="font-medium text-sm sm:text-base h-[32px] sm:h-[32px] w-[52px] sm:w-[84px] md:w-[84px] border border-gray-300 text-indigo-600 px-2 py-1 rounded-md hover:bg-gray-100"
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
