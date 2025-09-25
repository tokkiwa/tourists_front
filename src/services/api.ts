import axios from 'axios';

// APIのベースURL（環境変数から取得、デフォルトはlocalhost:5000）
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Axiosインスタンスを作成
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// メール情報の型定義
export interface EmailInfo {
  sender_raw: string;
  sender_email: string;
  subject: string;
  body: string;
  message_id: string;
  timestamp: string;
  timestamp_unix: number;
}

// API レスポンスの型定義
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

// Gmail監視関連のAPI
export const emailApi = {
  // ヘルスチェック
  healthCheck: async (): Promise<{ status: string; message: string }> => {
    const response = await api.get('/health');
    return response.data;
  },

  // Gmail監視を開始
  startMonitoring: async (): Promise<{ message: string }> => {
    const response = await api.post('/emails/start-monitoring');
    return response.data;
  },

  // Gmail監視を停止
  stopMonitoring: async (): Promise<{ message: string }> => {
    const response = await api.post('/emails/stop-monitoring');
    return response.data;
  },

  // 最新のメールを取得
  getLatestEmails: async (): Promise<{ emails: EmailInfo[] }> => {
    const response = await api.get('/emails/latest');
    return response.data;
  },

  // 設定を取得
  getConfig: async (): Promise<{ sender_list: string[]; project_id: string }> => {
    const response = await api.get('/config');
    return response.data;
  },

  // 監視状態を取得
  getMonitoringStatus: async (): Promise<{ is_monitoring: boolean }> => {
    const response = await api.get('/emails/status');
    return response.data;
  },
};

// エラーハンドリング用のインターセプター
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response?.status === 500) {
      console.error('Server Error:', error.response.data);
    } else if (error.code === 'ECONNREFUSED') {
      console.error('Connection refused - is the Flask server running?');
    }
    
    return Promise.reject(error);
  }
);

export default api;
