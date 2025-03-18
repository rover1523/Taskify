import { useState } from "react";
import RandomProfile from "./RandomProfile";

const MemberList = () => {
  const [members, setMembers] = useState([
    // 예시 데이터 추후 api 데이터로 변경
    { name: "정만철", initial: "J" },
    { name: "김태순", initial: "K" },
    { name: "최주협", initial: "C" },
    { name: "윤지현", initial: "Y" },
  ]);

  const handleDelete = (name: string) => {
    setMembers(members.filter((member) => member.name !== name));
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md h-[404px] w-[620px]">
      <div className="flex justify-between items-center">
        <p className="text-[24px] font-bold">구성원</p>
        <div className="flex items-center gap-2">
          <p className="text-sm text-[#9FA6B2]">1 페이지 중 1</p>
        </div>
      </div>

      <p className="text-[16px] text-[#9FA6B2] mt-6">이름</p>

      <ul>
        {members.map((member, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-4 ${
              index !== members.length - 1 ? "border-b border-[#EEEEEE]" : ""
            }`} // 마지막 선만 제거
          >
            <div className="flex items-center gap-4">
              <RandomProfile name={member.initial} />
              <p className="text-[16px] font-normal leading-[26px]">
                {member.name}
              </p>
            </div>
            <button
              onClick={() => handleDelete(member.name)}
              className="border border-[#D3D6DB] text-[#6B7280] px-3 py-1 rounded-md hover:bg-[#E5E7EB]"
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
