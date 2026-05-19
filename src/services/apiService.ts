import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const apiClient: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Interceptor для добавления JWT токена в каждый запрос
apiClient.interceptors.request.use((config) => {
	const token = localStorage.getItem("jwt_token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Interceptor для обработки ошибок
apiClient.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		if (error.response?.status === 401) {
			// Если 401, очищаем токен и редиректим на логин
			localStorage.removeItem("jwt_token");
			window.location.href = "/login";
		}
		return Promise.reject(error);
	},
);

// Auth endpoints
export const authAPI = {
	register: (email: string, username: string, password: string) =>
		apiClient.post("/auth/register", { email, username, password }),

	login: (email: string, password: string) =>
		apiClient.post("/auth/login", { email, password }),

	logout: () => apiClient.post("/api/logout"),
};

// Token endpoints
export const tokenAPI = {
	generateToken: (name: string) => apiClient.post("/api/tokens", { name }),

	getTokens: () => apiClient.get("/api/tokens"),

	revokeToken: (id: number) => apiClient.delete(`/api/tokens/${id}`),
};

// Health check
export const healthCheck = () => apiClient.get("/health");

export default apiClient;
