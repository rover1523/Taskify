// pages/index.tsx
import { TextCard } from "@/components/ColumnCard/TextCard";
import ColumnCard from "@/components/ColumnCard/ColumnCard";
import ImageCard from "@/components/ColumnCard/ImageCard";
import { TaskType } from "@/types/task";

const COLUMN_TODO = 1;
const COLUMN_PROGRESS = 2;
const COLUMN_DONE = 3;

const dummyTasks: TaskType[] = [
  {
    id: 1,
    title: "디자인 검토",
    description: "UI 구현을 잘 했는가?",
    dueDate: "2025.03.25",
    tags: ["디자인", "프론트엔드"],
    assignee: "혜진",
    imageUrl: "/svgs/img.svg",
    columnId: COLUMN_TODO,
  },
  {
    id: 2,
    title: "백엔드 API 설계",
    description: "API 동작 확인",
    dueDate: "2025.03.27",
    tags: ["백엔드", "API"],
    assignee: "민수",
    imageUrl: "/svgs/img.svg",
    columnId: COLUMN_PROGRESS,
  },
  {
    id: 3,
    title: "배포 준비",
    dueDate: "2025.03.27",
    assignee: "철수",
    imageUrl: "/svgs/img.svg",
    tags: ["배포"],
    columnId: COLUMN_DONE,
  },
  {
    id: 4,
    title: "디자인 QA",
    dueDate: "2025.03.30",
    assignee: "영자",
    imageUrl: "/svgs/img.svg",
    tags: ["디자인"],
    columnId: COLUMN_DONE,
  },
];

export default function Document() {
  const toDoTasks = dummyTasks.filter((task) => task.columnId === COLUMN_TODO);
  const progressTasks = dummyTasks.filter(
    (task) => task.columnId === COLUMN_PROGRESS
  );
  const doneTasks = dummyTasks.filter((task) => task.columnId === COLUMN_DONE);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex gap-6">
        <ColumnCard title="To Do" tasks={toDoTasks} />
        <ColumnCard title="On Progress" tasks={progressTasks} />
        <ColumnCard title="Done" tasks={doneTasks} />
      </div>

      {/* 테스트용 단일 카드 렌더링 */}
      <div className="flex gap-4">
        <TextCard {...dummyTasks[0]} />
        <ImageCard {...dummyTasks[1]} />
      </div>
    </div>
  );
}
