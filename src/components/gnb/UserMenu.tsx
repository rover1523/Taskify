import React, { useRef } from "react";
import { useRouter } from "next/router";
import { User, LogOut, FolderPen } from "lucide-react";
import { useOutsideClick } from "@/hooks/useOutSideClick";

interface UserMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserMenu: React.FC<UserMenuProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setIsMenuOpen(false));

  return (
    <div
      ref={ref}
      className={`absolute top-full right-0 w-full
        bg-white border border-[#D9D9D9] shadow z-50
        transition-all duration-200 ease-out
        ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
    >
      <button
        onClick={() => router.push("/mypage")}
        className="flex justify-center items-center w-full pt-3 pb-2 font-16r text-black3 hover:bg-[var(--color-gray5)]"
      >
        <User size={20} className="md:hidden" />
        <span className="hidden md:block">내 정보</span>
      </button>
      <button
        onClick={() => router.push("/mydashboard")}
        className="flex justify-center items-center w-full pt-2 pb-2 font-16r text-black3 hover:bg-[var(--color-gray5)]"
      >
        <FolderPen size={20} className="md:hidden" />
        <span className="hidden md:block">내 대시보드</span>
      </button>
      <button
        onClick={() => {
          localStorage.removeItem("accessToken");
          router.push("/login");
        }}
        className="flex justify-center items-center w-full pt-2 pb-3 font-16r text-black3 hover:bg-[var(--color-gray5)]"
      >
        <LogOut size={20} className="md:hidden" />
        <span className="hidden md:block">로그아웃</span>
      </button>
    </div>
  );
};

export default UserMenu;
