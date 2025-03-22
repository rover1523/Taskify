// ImageCard.tsx
import Image from "next/image";

type TextCardProps = {
  title: string;
  dueDate: string;
  tags: string[];
  assignee: string;
  imageUrl: string;
};

export default function ImageCard({
  title,
  dueDate,
  tags,
  assignee,
  imageUrl,
}: TextCardProps) {
  return (
    <div className="w-[314px] border border-gray-300 rounded-md p-4">
      <Image
        className="w-full h-40 object-cover rounded-md"
        src={imageUrl}
        width={300}
        height={160}
        alt="Task Image"
      />
      {/* 제목 */}
      <h3 className="font-medium mt-2">{title}</h3>
      {/* 태그 */}
      <div className="flex items-center gap-2 mt-2">
        <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded-md text-sm">
          {tags}
        </span>
      </div>
      {/* 날짜 & 아이콘 */}
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
        {/* 오른쪽 원형 아이콘 */}
        <div className="w-7 h-7 flex items-center justify-center bg-[#A3C4A2] text-white font-bold rounded-full text-sm">
          {assignee[0]}
        </div>
      </div>
    </div>
  );
}
