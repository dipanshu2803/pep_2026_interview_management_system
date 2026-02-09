import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Layout
import DashboardLayout from "./components/DashboardLayout";
import AdminRoute from "./components/AdminRoute";

// Landing
import Landing from "./pages/Landing";

// Auth
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

// User pages
import UserDashboard from "./pages/User/UserDashboard";
import ScheduleInterview from "./pages/User/ScheduleInterview";
import MyInterviews from "./pages/User/MyInterviews";
import InterviewDetail from "./pages/User/InterviewDetail";
import Profile from "./pages/User/Profile";
import Notifications from "./pages/User/Notifications";
import Feedback from "./pages/User/Feedback";

// Admin pages
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageInterviews from "./pages/Admin/ManageInterviews";
import ManageUsers from "./pages/Admin/ManageUsers";
import Reports from "./pages/Admin/Reports";
import Settings from "./pages/Admin/Settings";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* User routes (with dashboard layout) */}
        <Route
          path="/user/dashboard"
          element={
            <DashboardLayout>
              <UserDashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/user/schedule"
          element={
            <DashboardLayout>
              <ScheduleInterview />
            </DashboardLayout>
          }
        />
        <Route
          path="/user/interviews"
          element={
            <DashboardLayout>
              <MyInterviews />
            </DashboardLayout>
          }
        />
        <Route
          path="/user/interviews/:id"
          element={
            <DashboardLayout>
              <InterviewDetail />
            </DashboardLayout>
          }
        />
        <Route
          path="/user/notifications"
          element={
            <DashboardLayout>
              <Notifications />
            </DashboardLayout>
          }
        />
        <Route
          path="/user/feedback"
          element={
            <DashboardLayout>
              <Feedback />
            </DashboardLayout>
          }
        />
        <Route
          path="/user/profile"
          element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          }
        />

        {/* Admin routes (role-protected, dashboard layout) */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/interviews"
          element={
            <AdminRoute>
              <DashboardLayout>
                <ManageInterviews />
              </DashboardLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <DashboardLayout>
                <ManageUsers />
              </DashboardLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <AdminRoute>
              <DashboardLayout>
                <Reports />
              </DashboardLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
