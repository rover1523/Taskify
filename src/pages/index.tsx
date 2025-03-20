import CardButton from "./components/button/CardButton";
import ColumnsButton from "./components/button/ColumnsButton";
import DashboardAddButton from "./components/button/DashboardAddButton";
import DashboardDeleteButton from "./components/button/DashboardDeleteButton";
import TodoButton from "./components/button/TodoButton";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-10 ">
      <h1 className="text-xl font-semibold text-white mb-6">반응형 버튼</h1>

      {/* 컬럼 추가 버튼 */}
      <ColumnsButton>새로운 컬럼 추가하기</ColumnsButton>
      <DashboardAddButton />
      <DashboardDeleteButton />
      <TodoButton />
      <CardButton />
    </div>
  );
}
