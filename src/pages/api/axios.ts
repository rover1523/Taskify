import axios from "axios";

const TEAM_ID = 4;

// 카드 데이터
interface CardData {
  title: string;
  description: string;
  tags?: string[];
  assignee?: string;
  dueDate?: string;
  columnId: number;
}

// 카드 응답
interface CardResponse extends CardData {
  id: number;
  createdAt: string;
  updatedAt: string;
}

// 컬럼 데이터
interface ColumnData {
  name: string;
  order: number;
}

// 컬럼 응답
interface ColumnResponse extends ColumnData {
  id: number;
  createdAt: string;
  updatedAt: string;
}

// axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// API 엔드포인트 경로 정의
const apiRoutes = {
  cards: () => `/teams/${TEAM_ID}/cards`,
  cardDetail: (cardId: number) => `/teams/${TEAM_ID}/cards/${cardId}`,
  columnDetail: (columnId: number) => `/teams/${TEAM_ID}/columns/${columnId}`,
  columns: () => `/teams/${TEAM_ID}/columns`,
  columnCardImage: (columnId: number) =>
    `/teams/${TEAM_ID}/columns/${columnId}/card-image`,
};

const api = {
  // 카드 관련 API
  cards: {
    // 카드 생성 (POST)
    create: (cardData: CardData) =>
      apiClient.post<CardResponse>(apiRoutes.cards(), cardData),

    // 카드 목록 조회 (GET)
    getAll: () => apiClient.get<CardResponse[]>(apiRoutes.cards()),

    // 카드 상세 조회 (GET)
    getById: (cardId: number) =>
      apiClient.get<CardResponse>(apiRoutes.cardDetail(cardId)),

    // 카드 수정 (PUT)
    update: (cardId: number, cardData: Partial<CardData>) =>
      apiClient.put<CardResponse>(apiRoutes.cardDetail(cardId), cardData),

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
};

export default api;
