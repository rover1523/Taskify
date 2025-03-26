export interface MemberType {
  id: number;
  profileImageUrl: string;
  nickname: string;
  isOwner?: boolean;
  userId?: number;
}

export interface UserType {
  profileImageUrl: string;
  nickname: string;
}
