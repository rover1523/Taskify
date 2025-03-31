import React, { useRef } from "react";
import { useClosePopup } from "@/hooks/useClosePopup";
import { UserAvatars } from "@/components/gnb/Avatars";
import { MemberType } from "@/types/users";

interface MemberListMenuProps {
  isListOpen: boolean;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  members: MemberType[];
}

const MemberListMenu: React.FC<MemberListMenuProps> = ({
  isListOpen,
  setIsListOpen,
  members,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useClosePopup(ref, () => setIsListOpen(false));

  return (
    <div
      ref={ref}
      className={`absolute top-full right-0 w-full z-50
        bg-white border border-[#D9D9D9] shadow
        transition-all duration-200 ease-out
        ${isListOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
    >
      <ul className="flex flex-col font-16r max-h-[300px] overflow-y-auto">
        {members.map((member) => (
          <li
            key={member.id}
            className="px-4 py-2 flex items-center gap-2 hover:bg-[#f9f9f9]"
          >
            <UserAvatars user={member} />
            <span className="text-black3 text-sm md:text-base">
              {member.nickname}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberListMenu;
