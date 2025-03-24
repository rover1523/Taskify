// 컴포넌트 test 파일

import MemberList from "@/components/table/member/MemberList";
import InviteRecords from "@/components/table/InviteRecords";
import InvitedDashBoard from "@/components/table/invited/InvitedDashBoard";
import Profile from "@/components/Card/Profile";
import ChangePassword from "@/components/Card/ChangePassword";

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
      <br />
      <h1 className="text-2xl font-bold">프로필 카드 테스트</h1>
      <Profile />
      <br />
      <h1 className="text-2xl font-bold">비밀번호 변경 카드 테스트</h1>
      <ChangePassword />
    </div>
  );
}
