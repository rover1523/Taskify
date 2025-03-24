import axios from "axios";

const TEAM_ID = "13-4";

// 카드 데이터
export interface CardData {
  assigneeUserId: 0;
  dashboardId: 0;
  columnId: 0;
  title: "string";
  description: "string";
  dueDate: "string";
  tags: ["string"];
  imageUrl: "string";
}
// 카드 응답
export interface CardListResponse {
  cards: [];
  totalCount: number;
  cursorId: number | null;
}
export interface CardUpdateRequest {
  columnId: number;
  assignee: string;
  description: string;
  title: string;
  tags: string[];
  //카드 이미지 URL
  imageUrl: string;
  //카드 마감일(YYYY-MM-DD 등 문자열 포맷)
  dueDate: string;
}

// 컬럼 데이터
export interface ColumnData {
  name: string;
  order: number;
}

// 컬럼 응답
export interface ColumnResponse extends ColumnData {
  id: number;
  createdAt: string;
  updatedAt: string;
}
// 대시보드 데이터
export interface DashboardData {
  title: string;
  color?: string; //색상 값 수정 필요
}
// 대시보드 응답
export interface DashboardResponse extends DashboardData {
  id: number;
  title: string;
  color?: "#7AC555"; //색상 값 수정 필요
  createdAt?: string;
  updatedAt?: string;
  createdByMe?: boolean;
  userId?: number;
}

// axios 인스턴스 생성
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTI4NywidGVhbUlkIjoiMTMtNCIsImlhdCI6MTc0MjU0NDgyNywiaXNzIjoic3AtdGFza2lmeSJ9.UP9Fw0ooYnakK5nnkV8i-HCM5n5tE1dtrL6rfXTHXBg"; // 개인 토큰 값
export const apiClient = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// API 엔드포인트 경로 정의
const apiRoutes = {
  cards: () => `/${TEAM_ID}/cards`,
  cardDetail: (cardId: number) => `/${TEAM_ID}/cards/${cardId}`,
  columnDetail: (columnId: number) => `/${TEAM_ID}/columns/${columnId}`,
  columns: () => `/${TEAM_ID}/columns`,
  columnCardImage: (columnId: number) =>
    `/${TEAM_ID}/columns/${columnId}/card-image`,
  dashboards: () => `/${TEAM_ID}/dashboards`,
  dashboardDetail: (dashboardId: number) =>
    `/${TEAM_ID}/dashboards/${dashboardId}`,
};

// 카드 관련 API
export async function createCard(
  cardData: CardData
): Promise<CardListResponse> {
  const res = await apiClient.post<CardListResponse>(
    apiRoutes.cards(),
    cardData
  );
  return res.data;
}

export async function getAllCards(
  dashboardId: number
): Promise<CardListResponse[]> {
  const res = await apiClient.get<CardListResponse[]>(apiRoutes.cards(), {
    params: { dashboard_id: dashboardId },
  });
  return res.data;
}

export async function getCardById(cardId: number): Promise<CardListResponse> {
  const res = await apiClient.get<CardListResponse>(
    apiRoutes.cardDetail(cardId)
  );
  return res.data;
}

export async function updateCard(
  cardId: number,
  cardData: Partial<CardData>
): Promise<CardListResponse> {
  const res = await apiClient.put<CardListResponse>(
    apiRoutes.cardDetail(cardId),
    cardData
  );
  return res.data;
}

export async function deleteCard(cardId: number): Promise<void> {
  await apiClient.delete(apiRoutes.cardDetail(cardId));
}

// 컬럼 관련 API
export async function createColumn(
  columnData: ColumnData
): Promise<ColumnResponse> {
  const res = await apiClient.post<ColumnResponse>(
    apiRoutes.columns(),
    columnData
  );
  return res.data;
}

export async function getAllColumns(): Promise<ColumnResponse[]> {
  const res = await apiClient.get<ColumnResponse[]>(apiRoutes.columns());
  return res.data;
}

export async function updateColumn(
  columnId: number,
  columnData: Partial<ColumnData>
): Promise<ColumnResponse> {
  const res = await apiClient.put<ColumnResponse>(
    apiRoutes.columnDetail(columnId),
    columnData
  );
  return res.data;
}

export async function deleteColumn(columnId: number): Promise<void> {
  await apiClient.delete(apiRoutes.columnDetail(columnId));
}

export async function uploadCardImage(
  columnId: number,
  imageData: { image: File }
): Promise<any> {
  const formData = new FormData();
  formData.append("image", imageData.image);

  const res = await apiClient.post(
    apiRoutes.columnCardImage(columnId),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
}

// 대시보드 관련 API
export async function createDashboard(
  dashboardData: DashboardData
): Promise<DashboardResponse> {
  const res = await apiClient.post<DashboardResponse>(
    apiRoutes.dashboards(),
    dashboardData
  );
  return res.data;
}

export async function getAllDashboards(): Promise<DashboardResponse[]> {
  const res = await apiClient.get<DashboardResponse[]>(apiRoutes.dashboards());
  return res.data;
}

export async function getDashboardById(
  dashboardId: number
): Promise<DashboardResponse> {
  const res = await apiClient.get<DashboardResponse>(
    apiRoutes.dashboardDetail(dashboardId)
  );
  return res.data;
}

export async function updateDashboard(
  dashboardId: number,
  dashboardData: Partial<DashboardData>
): Promise<DashboardResponse> {
  const res = await apiClient.put<DashboardResponse>(
    apiRoutes.dashboardDetail(dashboardId),
    dashboardData
  );
  return res.data;
}

export async function deleteDashboard(dashboardId: number): Promise<void> {
  await apiClient.delete(apiRoutes.dashboardDetail(dashboardId));
}
