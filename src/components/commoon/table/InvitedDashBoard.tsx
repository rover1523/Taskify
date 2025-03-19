import { useState, useEffect } from "react";
import Image from "next/image";

function EmptyInvitations() {
  return (
    <div className="relative w-[960px] h-[390px] top-[20px] left-[20px] rounded-[16px] p-[24px_40px_120px_40px] gap-[64px] bg-white shadow-md mx-auto">
      <div className="flex justify-between items-center">
        <p className="text-xl sm:text-2xl font-bold mb-4">초대받은 대시보드</p>
      </div>

      <div className="flex flex-col justify-center items-center h-[calc(100%-40px)]">
        <img
          className="w-[100px] h-[100px] mb-2"
          src="/svgs/unsubscribe.svg"
          alt="초대받은 대시보드가 없을 때 아이콘 이미지"
        />
        <p className="text-lg leading-[26px] text-[#9FA6B2]">
          아직 초대받은 대시보드가 없어요
        </p>
      </div>
    </div>
  );
}

function InvitedList() {
  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md w-[1022px] h-[650px] max-w-none mx-auto">
      <div className="flex justify-between items-center">
        <p className="text-xl sm:text-2xl font-bold">초대받은 대시보드</p>
      </div>
    </div>
  );
}

export default function InvitedDashBoard() {
  return <EmptyInvitations />;
}
