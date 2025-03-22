export type TaskType = {
  id: number;
  title: string;
  dueDate: string;
  tags: string[];
  assignee: string;
  imageUrl?: string;
};
// 하나의 카드가 어떤 데이터를 포함하는지 정의한 타입. 임시
