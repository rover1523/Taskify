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
  color?: "#7AC555"; //색상 값 수정 필요
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

const api = {
  // 카드 관련 API
  cards: {
    // 카드 생성 (POST)
    create: (cardData: CardData) =>
      apiClient.post<CardListResponse>(apiRoutes.cards(), cardData),

    // 카드 목록 조회 (GET)
    getAll: (dashboardId: number) =>
      apiClient.get<CardListResponse[]>(apiRoutes.cards(), {
        params: { dashboard_id: dashboardId },
      }),
    // 카드 상세 조회 (GET)
    getById: (cardId: number) =>
      apiClient.get<CardListResponse>(apiRoutes.cardDetail(cardId)),

    // 카드 수정 (PUT)
    update: (cardId: number, cardData: Partial<CardData>) =>
      apiClient.put<CardListResponse>(apiRoutes.cardDetail(cardId), cardData),

    // 카드 삭제 (DELETE)
    delete: (cardId: number) => apiClient.delete(apiRoutes.cardDetail(cardId)),
  },

  // 컬럼 관련 API
  columns: {
    // 컬럼 생성 (POST)
    create: (columnData: ColumnData) =>
      apiClient.post<ColumnResponse>(apiRoutes.columns(), columnData),

    // 컬럼 목록 조회 (GET)
    getAll: () => apiClient.get<ColumnResponse[]>(apiRoutes.columns()),

    // 컬럼 수정 (PUT)
    update: (columnId: number, columnData: Partial<ColumnData>) =>
      apiClient.put<ColumnResponse>(
        apiRoutes.columnDetail(columnId),
        columnData
      ),

    // 컬럼 삭제 (DELETE)
    delete: (columnId: number) =>
      apiClient.delete(apiRoutes.columnDetail(columnId)),

    // 카드 이미지 업로드 (POST)
    uploadCardImage: (columnId: number, imageData: { image: File }) => {
      const formData = new FormData();
      formData.append("image", imageData.image);

      // headers를 변경한 요청 전송
      return apiClient.post(apiRoutes.columnCardImage(columnId), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  },
  //대시보드 관련 API
  dashboards: {
    //대시보드 생성 (POST)
    create: (dashboardData: DashboardData) =>
      apiClient.post<DashboardResponse>(apiRoutes.dashboards(), dashboardData),
    //대시보드 조회 (GET)
    getAll: () => apiClient.get<DashboardResponse[]>(apiRoutes.dashboards()),
    //대시보드 상세 조회 (GET)
    getById: (dashboardId: number) =>
      apiClient.get<DashboardResponse>(apiRoutes.dashboardDetail(dashboardId)),
    //대시보드 수정 (PUT)
    update: (dashboardId: number, dashboardData: Partial<DashboardData>) =>
      apiClient.put<DashboardResponse>(
        apiRoutes.dashboardDetail(dashboardId),
        dashboardData
      ),
    //대시보드 삭제 (DELETE)
    delete: (dashboardId: number) =>
      apiClient.delete(apiRoutes.dashboardDetail(dashboardId)),
    //대시보드 초대 (POST)
  },
};

export default api;
