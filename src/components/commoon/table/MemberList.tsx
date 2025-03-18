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
    <div className="bg-white p-6 rounded-lg shadow-md w-96">
      <p className="text-lg font-semibold mb-4">구성원</p>
      <p className="text-base">이름</p>
      <ul>
        {members.map((member, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-2 border-b"
          >
            <div className="flex items-center gap-3">
              <RandomProfile name={member.initial} />
              <p className="font-normal text-base leading-[26px] tracking-normal">
                {member.name}
              </p>
            </div>
            <button
              onClick={() => handleDelete(member.name)}
              className="text-purple-500 hover:text-purple-700"
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
