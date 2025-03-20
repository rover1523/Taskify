// 컴포넌트 test 파일

import MemberList from "@/components/commoon/table/Member/MemberList";
import InviteRecords from "@/components/commoon/table/InviteRecords";
import InvitedDashBoard from "@/components/commoon/table/Invited/InvitedDashBoard";

export default function TestPage() {
  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <h1 className="text-2xl font-bold">구성원 테이블 테스트</h1>
      <MemberList />
      <br />
      <h1 className="text-2xl font-bold">초대 테이블 테스트</h1>
      <InviteRecords />
      <br />
      <h1 className="text-2xl font-bold">초대받은 테이블 테스트</h1>
      <InvitedDashBoard />
    </div>
  );
}
