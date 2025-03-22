// ColumnCard.tsx
import TodoButton from "@/components/button/TodoButton";
import { useState } from "react";
import { TextCard } from "./TextCard";
import { TaskType } from "../../types/task";

type ColumnCardProps = {
  title?: string;
  tasks?: TaskType[];
};

export default function ColumnCard({
  title = "new Task",
  tasks = [],
}: ColumnCardProps) {
  const [showCard, setShowCard] = useState(false);

  return (
    <div className="w-[354px] h-[1010px] border-[var(--color-gray4)] flex flex-col rounded-md border border-solid bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">
          <span className="text-[var(--primary)]">•</span> {title}
        </h2>
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
          {tasks.length}
        </span>
      </div>

      <div onClick={() => setShowCard(true)}>
        <TodoButton />
      </div>

      {showCard && tasks.map((task) => <TextCard key={task.id} {...task} />)}
    </div>
  );
}
