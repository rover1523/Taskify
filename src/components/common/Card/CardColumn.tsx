import TodoButton from "@/components/button/TodoButton";
import { useState } from "react";
import { TextCard } from "./TextCard";

const dummyTasks = [
  {
    id: 1,
    title: "디자인 리뷰",
    description: "Figma에서 디자인 검토",
    dueDate: "2025.03.25",
    assignee: "황혜진",
    status: "To Do",
  },
];

export default function CardColumn() {
  const [showCard, setShowCard] = useState(false);

  const handleButtonClick = () => {
    setShowCard(true);
  };

  return (
    <div className="w-[354px] h-[1010px] border-[var(--color-gray4)] flex flex-col rounded-md border border-solid bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">
          <span className="text-[var(--primary)]">•</span> On Progress
        </h2>
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
          2
        </span>
      </div>

      <div onClick={handleButtonClick}>
        <TodoButton />
      </div>

      {showCard && <TextCard />}
    </div>
  );
}
