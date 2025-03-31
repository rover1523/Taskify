import React, { useRef } from "react";
import { useRouter } from "next/router";
import { useClosePopup } from "@/hooks/useClosePopup";
import { User, LogOut, FolderPen } from "lucide-react";
import { UserType } from "@/types/users";
import useUserStore from "@/store/useUserStore";

interface UserMenuProps {
  user: UserType | null;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const dropdownButtonStyles =
  "flex justify-center md:justify-start items-center w-full px-3 py-3 gap-3 font-16r text-black3 hover:text-[var(--primary)] hover:bg-[#f9f9f9] cursor-pointer";

const UserMenu: React.FC<UserMenuProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { clearUser } = useUserStore();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useClosePopup(ref, () => setIsMenuOpen(false));

  const handleLogout = () => {
    localStorage.setItem("isLoggingOut", "true");
    clearUser();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiresAt");
    router.push("/");
  };

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
        className={dropdownButtonStyles}
      >
        <User size={20} />
        <span className="hidden md:block">내 정보</span>
      </button>
      <button
        onClick={() => router.push("/mydashboard")}
        className={dropdownButtonStyles}
      >
        <FolderPen size={20} />
        <span className="hidden md:block">내 대시보드</span>
      </button>
      <button onClick={handleLogout} className={dropdownButtonStyles}>
        <LogOut size={20} />
        <span className="hidden md:block">로그아웃</span>
      </button>
    </div>
  );
};

export default UserMenu;
