// 컴포넌트 test 파일

import RandomProfile from "../components/commoon/table/RandomProfile";

export default function TestPage() {
  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <h1 className="text-2xl font-bold">RandomProfile 테스트</h1>
      <RandomProfile size={100} name="홍길동" />
      <RandomProfile size={80} name="김철수" />
      <RandomProfile size={60} name="황영희" />
    </div>
  );
}
