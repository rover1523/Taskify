export type TaskType = {
  id: number;
  title: string;
  tags: { name: string; color: string }[];
  dueDate: string;
  assignee?: {
    id: number;
    nickname: string;
    profileImageUrl: null;
  };
  imageUrl?: string;
  description?: string;
  columnId?: number;
};
