// 컴포넌트 test 파일

import MemberList from "@/components/commoon/table/MemberList";

export default function TestPage() {
  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <h1 className="text-2xl font-bold">Profile 테스트</h1>
      <MemberList />
    </div>
  );
}
