import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './layouts/AppLayout';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import UserDashboard from './pages/UserDashboard';
import QuestionBankPage from './pages/QuestionBankPage';
import MockInterviewPage from './pages/MockInterviewPage';
import RoadmapPage from './pages/RoadmapPage';
import AnalyticsPage from './pages/AnalyticsPage';
import BookmarksPage from './pages/BookmarksPage';
import InterviewHistoryPage from './pages/InterviewHistoryPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

// Admin Pages
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminQuestionsPage from './pages/AdminQuestionsPage';
import AdminCategoriesPage from './pages/AdminCategoriesPage';
import AdminStatisticsPage from './pages/AdminStatisticsPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* User Protected Routes wrapped in AppLayout */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <UserDashboard />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/practice"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <QuestionBankPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mock-interview"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <MockInterviewPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/roadmap"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <RoadmapPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <AnalyticsPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/questions"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <QuestionBankPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bookmarks"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <BookmarksPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <InterviewHistoryPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <ProfilePage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <AppLayout>
                      <SettingsPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />

              {/* Admin Protected Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AppLayout>
                      <AdminDashboardPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AppLayout>
                      <AdminUsersPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/questions"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AppLayout>
                      <AdminQuestionsPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/categories"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AppLayout>
                      <AdminCategoriesPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/statistics"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AppLayout>
                      <AdminStatisticsPage />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
