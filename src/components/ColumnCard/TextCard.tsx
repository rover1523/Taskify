// TextCard.tsx
import Image from "next/image";
import { TaskType } from "@/types/task";

export function TextCard({ title, dueDate, tags, assignee }: TaskType) {
  return (
    <div className="mt-4 space-y-2.5">
      {" "}
      <div className="w-[314px] h-[128px] border border-gray-200 rounded-lg p-4 bg-white flex flex-col">
        <h3 className="font-medium text-lg text-gray-900">{title}</h3>

        <div className="flex items-center gap-2.5 mt-2.5">
          {tags.map((tags, id) => (
            <span
              key={id}
              className="bg-pink-200 text-pink-600 px-3 py-1 rounded-md text-sm"
            >
              {tags}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-2.5">
          <div className="flex items-center gap-2.5 text-gray-500 text-sm">
            <Image
              src="/svgs/calendar.svg"
              alt="calendar icon"
              width={16}
              height={16}
              priority
            />
            <p>{dueDate}</p>
          </div>
          {/* todo 데이터로 사용자 벳지 받아오기 */}
          <div className="w-7 h-7 flex items-center justify-center bg-[#A3C4A2] text-white font-bold rounded-full text-sm">
            {assignee[0]}
          </div>
        </div>
      </div>
    </div>
  );
}
