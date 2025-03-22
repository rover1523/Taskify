import { TextCard } from "@/components/ColumnCard/TextCard";
import ColumnCard from "../components/ColumnCard/ColumnCard";
import ImageCard from "@/components/ColumnCard/ImageCard";
import { TaskType } from "../types/task";

const COLUMN_TODO = 1;
const COLUMN_PROGRESS = 2;
const COLUMN_DONE = 3;

export const dummyTasks: TaskType[] = [
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
    description: "데이터를 문제없이 잘 받아오는가?",
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
    columnId: COLUMN_DONE,
    imageUrl: "/svgs/img.svg",
    tags: ["배포"],
  },
];

export default function Document() {
  return (
    <div>
      <div className="flex gap-4">
        <ColumnCard
          title="To Do"
          tasks={dummyTasks.filter((task) => task.columnId === COLUMN_TODO)}
        />
        <ColumnCard
          title="On Progress"
          tasks={dummyTasks.filter((task) => task.columnId === COLUMN_PROGRESS)}
        />
        <ColumnCard
          title="Done"
          tasks={dummyTasks.filter((task) => task.columnId === COLUMN_DONE)}
        />
      </div>
      <TextCard
        title="테스트 카드"
        dueDate="2025.03.30"
        tags={["프론트엔드", "디자인"]}
        assignee="혜진"
      />
      <ImageCard
        title="테스트 카드"
        dueDate="2025.03.30"
        tags={["프론트엔드", "디자인"]}
        assignee="혜진"
        imageUrl="/svgs/img.svg"
      />
    </div>
  );
}
