// CardColumn.tsx
import TodoButton from "@/components/button/TodoButton";
import { useState } from "react";
import { TextCard } from "./TextCard";
import { TaskType } from "../../../types/task";

export const dummyTasks: TaskType[] = [
  {
    id: 1,
    title: "디자인 검토",
    dueDate: "2025.03.25",
    tags: ["디자인", "프론트엔드"],
    assignee: "혜진",
    imageUrl: "/svgs/img.svg",
  },
  {
    id: 2,
    title: "백엔드 API 설계",
    dueDate: "2025.03.27",
    tags: ["백엔드", "API"],
    assignee: "민수",
    imageUrl: "/svgs/img.svg",
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
          {dummyTasks.length}
        </span>
      </div>

      <div onClick={handleButtonClick}>
        <TodoButton />
      </div>

      {showCard &&
        dummyTasks.map((task) => (
          <TextCard
            key={task.id}
            title={task.title}
            dueDate={task.dueDate}
            tags={task.tags}
            assignee={task.assignee}
          />
        ))}
    </div>
  );
}
