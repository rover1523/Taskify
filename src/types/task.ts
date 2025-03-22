export type TaskType = {
  id: number;
  title: string;
  dueDate: string;
  tags: string[];
  assignee: string;
  imageUrl?: string;
  description?: string;
  columnId?: number;
};
