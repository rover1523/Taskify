export type TaskType = {
  id: number;
  title: string;
  tags: string[];
  dueDate: string;
  assignee?: string;
  imageUrl?: string;
  description?: string;
  columnId?: number;
};
