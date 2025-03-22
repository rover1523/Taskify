import Image from "next/image";

const dummyTasks = [
  {
    id: 1,
    title: "디자인 리뷰",
    description: "Figma에서 디자인 검토",
    dueDate: "2025.03.25",
    assignee: "황혜진",
    status: "To Do",
  },
  {
    id: 2,
    title: "API 연동 작업",
    description: "Taskify API 문서 확인",
    dueDate: "2025.03.26",
    assignee: "박지수",
    status: "In Progress",
  },
  {
    id: 3,
    title: "배포 준비",
    description: "Vercel에 배포 테스트",
    dueDate: "2025.03.27",
    assignee: "이민호",
    status: "Done",
  },
];
export default function Card() {
  return (
    <div className="border-[var(--color-gray3)] flex w-full items-center justify-center rounded-md border border-solid bg-white p-4">
      <div className="flex w-full flex-col items-start justify-center gap-4 max-[769px]:flex-row max-[769px]:gap-5 max-sm:flex-col max-sm:gap-1">
        <div className="relative h-40 w-[274px] max-[769px]:h-[53px] max-[769px]:w-[90px] max-sm:h-[152px] max-sm:w-[260px]">
          <Image
            fill
            className="rounded-sm object-cover"
            src={image}
            alt="cardImage"
          />
        </div>
        <div className="flex w-full flex-col items-start justify-center gap-2.5">
          <h3 className="font-16m">새로운 일정 관리</h3>
          <div className="flex w-full flex-col items-start justify-center gap-2.5 max-[769px]:flex-row max-sm:flex-col">
            <div className="bg-violet gap- h-7 w-[147px]" />
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center justify-center gap-1.5 border-[var(--color-gray3)] ">
                <Image src={date} width={18} height={18} alt="date" />
                <p className="text-[var(--color-gray5)]  font-12m">
                  2025.01.01
                </p>
              </div>
              <UserBadge
                size={24}
                gap={16}
                userName="김철수"
                responsive
                fontSize="M16"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
