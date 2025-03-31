// Card.tsx
import { AssigneeType, CardType } from "@/types/task";
import Image from "next/image";

type CardProps = CardType & {
  imageUrl?: string | null;
  assignee: AssigneeType;
};

export default function Card({
  title = "new Task",
  dueDate,
  tags,
  assignee,
  imageUrl,
}: CardProps) {
  return (
    <div className="w-[314px] border-1 border-gray-200 bg-white rounded-md p-4">
      {imageUrl && (
        <Image
          className="w-full h-40 object-cover rounded-md"
          src={imageUrl}
          width={300}
          height={160}
          alt="Task Image"
        />
      )}
      <h3 className="text-lg mt-2">{title}</h3>
      <div className="flex items-center gap-2 mt-2">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className={`px-2 py-1 rounded-md text-sm ${
              idx % 3 === 0
                ? "bg-[#F9EEE3] text-[#D58D49]"
                : idx % 3 === 1
                  ? "bg-[#F7DBF0] text-[#D549B6]"
                  : "bg-[#DBE6F7] text-[#4981D5]"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-2">
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
        <div className="w-7 h-7 flex items-center justify-center bg-[#A3C4A2] text-white font-bold rounded-full text-sm">
          {assignee.nickname[0]}
        </div>
      </div>
    </div>
  );
}
