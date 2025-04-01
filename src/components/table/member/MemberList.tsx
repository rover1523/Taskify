import { useState, useEffect } from "react";
import Pagination from "../TablePagination";
import RandomProfile from "./RandomProfile";
import { MemberType } from "@/types/users";
import { getMembers } from "@/api/members";
import { apiRoutes } from "@/api/apiRoutes";
import axiosInstance from "@/api/axiosInstance";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface HeaderBebridgeProps {
  dashboardId?: string | string[];
}

const MemberList: React.FC<HeaderBebridgeProps> = ({ dashboardId }) => {
  const [members, setMembers] = useState<MemberType[]>([]);

  /* 페이지네이션 */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(members.length / itemsPerPage);

  const paginatedMembers = members.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /*버튼(삭제, 이전, 다음)*/
  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(apiRoutes.memberDetail(id));
      window.location.reload();
    } catch (error) {
      toast.error("구성원원 삭제에 실패하였습니다 .");
      console.error("구성원 삭제 실패:", error);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  /*멤버 목록 api 호출*/
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        if (dashboardId) {
          const members = await getMembers({
            dashboardId: Number(dashboardId),
          });
          setMembers(members);
          console.log("member_list", members);
        }
      } catch (error) {
        console.error("멤버 불러오기 실패:", error);
      }
    };

    fetchMembers();
  }, [dashboardId]);

  return (
    <div className="lg:w-[620px] lg:h-[404px] w-[284px] h-[337px] sm:w-[544px] sm:h-[404px] relative bg-white p-6 rounded-lg">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="flex justify-between items-center ">
        <p className="text-xl sm:text-2xl font-bold">구성원</p>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
        />
      </div>

      {/* 구성원 리스트 */}
      <p className="text-sm sm:text-base text-gray-500 mt-6 mb-4">이름</p>

      <ul>
        {paginatedMembers.map((member, index) => (
          <li
            key={index}
            className={`flex items-center justify-between mt-3 pb-4 ${
              index !== paginatedMembers.length - 1
                ? "border-b border-gray-200"
                : ""
            }`}
          >
            <div className="flex items-center gap-4">
              {member.profileImageUrl ? (
                <div className="relative w-[34px] h-[34px] md:w-[38px] md:h-[38px] rounded-full border-[2px] border-white overflow-hidden">
                  <Image
                    src={member.profileImageUrl}
                    alt={member.nickname}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <RandomProfile name={member.nickname} index={index} />
              )}

              <p className="text-sm sm:text-base">
                {member.nickname}
                {member.isOwner && "(소유자)"}
              </p>
            </div>
            {!member.isOwner && (
              <button
                onClick={() => handleDelete(member.id)}
                className="text-md-Medium cursor-pointer font-medium text-sm sm:text-base h-[32px] sm:h-[32px] w-[52px] sm:w-[84px] md:w-[84px] border border-gray-300 text-indigo-600 px-2 py-1 rounded-md hover:bg-gray-100"
              >
                삭제
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
