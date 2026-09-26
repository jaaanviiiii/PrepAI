import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach JWT token to requests automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('prepai_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Centralized response error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    if (error.response?.status === 401) {
      // Optional auto-logout on token expiration
      if (localStorage.getItem('prepai_token')) {
        localStorage.removeItem('prepai_token');
        localStorage.removeItem('prepai_user');
      }
    }
    return Promise.reject({ ...error, customMessage: message });
  }
);

// Auth endpoints
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const getMe = () => API.get('/auth/me');

// User profile & stats
export const getUserProfile = () => API.get('/users/profile');
export const updateUserProfile = (data) => API.put('/users/profile', data);
export const getUserStats = () => API.get('/users/stats');

// Questions
export const getQuestions = (params) => API.get('/questions', { params });
export const getQuestionById = (id) => API.get(`/questions/${id}`);
export const createQuestion = (data) => API.post('/questions', data);
export const updateQuestion = (id, data) => API.put(`/questions/${id}`, data);
export const deleteQuestion = (id) => API.delete(`/questions/${id}`);
export const reportQuestion = (id, reason) => API.post(`/questions/${id}/report`, { reason });

// Bookmarks
export const getBookmarks = (params) => API.get('/bookmarks', { params });
export const addBookmark = (questionId) => API.post('/bookmarks', { questionId });
export const removeBookmark = (id) => API.delete(`/bookmarks/${id}`);

// Mock Interviews
export const startInterview = (data) => API.post('/interviews/start', data);
export const submitInterviewAnswer = (id, data) => API.post(`/interviews/${id}/answer`, data);
export const completeInterview = (id, data) => API.post(`/interviews/${id}/complete`, data);
export const getInterviewHistory = () => API.get('/interviews/history');
export const getInterviewById = (id) => API.get(`/interviews/${id}`);

// Analytics
export const getDashboardAnalytics = () => API.get('/analytics/dashboard');
export const getPerformanceAnalytics = () => API.get('/analytics/performance');

// Roadmap
export const getRoadmap = () => API.get('/roadmap');
export const generateRoadmap = (data) => API.post('/roadmap/generate', data);
export const updateRoadmapTask = (id, data) => API.put(`/roadmap/${id}/task`, data);

// Admin
export const getAdminUsers = () => API.get('/admin/users');
export const deleteAdminUser = (id) => API.delete(`/admin/users/${id}`);
export const getAdminStatistics = () => API.get('/admin/statistics');
export const getReportedQuestions = () => API.get('/admin/reported');

export default API;
