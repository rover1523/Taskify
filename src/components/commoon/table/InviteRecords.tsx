import { useState } from "react";
import Pagination from "../Pagination";

const InviteRecords = () => {
  const [invitelog, setInvitelog] = useState([
    // 나중에 api 데이터로 변경
    { email: "codeit1@codeit.com" },
    { email: "codeit2@codeit.com" },
    { email: "codeit3@codeit.com" },
    { email: "codeit4@codeit.com" },
    { email: "codeit5@codeit.com" },
    { email: "codeit6@codeit.com" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(invitelog.length / itemsPerPage);

  const paginatedInvitation = invitelog.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /*버튼(삭제, 이전, 다음)*/
  const handleDelete = (email: string) => {
    setInvitelog(invitelog.filter((invitelog) => invitelog.email !== email));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md max-w-md w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <p className="text-lg sm:text-xl font-bold">초대 내역</p>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
        />
      </div>
      {/* 구성원 리스트 */}
      <p className="text-sm sm:text-base text-gray-500 mt-6">이메일</p>
      <ul>
        {paginatedInvitation.map((invitelog, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-4 ${
              index !== paginatedInvitation.length - 1
                ? "border-b border-gray-200"
                : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <p className="text-sm sm:text-base">{invitelog.email}</p>
            </div>
            <button
              onClick={() => handleDelete(invitelog.email)}
              className="cursor-pointer font-medium text-sm sm:text-base h-[32px] sm:h-[32px] w-[52px] sm:w-[84px] md:w-[84px] border border-gray-300 text-indigo-600 px-2 py-1 rounded-md hover:bg-gray-100"
            >
              취소
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InviteRecords;
