import Image from "next/image";

export default function ImageCard() {
  return (
    <div className="border border-gray-300 rounded-md p-4">
      <Image
        className="w-full h-40 object-cover rounded-md"
        src="/mnt/data/image.png"
        width={300}
        height={160}
        alt="Task Image"
      />
      <h3 className="font-medium mt-2">새로운 일정 관리 Taskify</h3>
      <div className="flex items-center gap-2 mt-2">
        <span className="bg-orange-200 text-orange-700 px-2 py-1 rounded-md text-sm">
          프로젝트
        </span>
        <span className="bg-pink-200 text-pink-700 px-2 py-1 rounded-md text-sm">
          백엔드
        </span>
        <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded-md text-sm">
          상
        </span>
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        <p className="text-gray-500 text-sm">📅 2022.12.31</p>
      </div>
    </div>
  );
}
