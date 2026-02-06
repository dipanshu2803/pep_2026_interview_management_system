import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Layout
import DashboardLayout from "./components/DashboardLayout";

// Auth
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";

// User pages
import UserDashboard from "./pages/User/UserDashboard";
import ScheduleInterview from "./pages/User/ScheduleInterview";
import MyInterviews from "./pages/User/MyInterviews";
import InterviewDetail from "./pages/User/InterviewDetail";
import Profile from "./pages/User/Profile";
import Notifications from "./pages/User/Notifications";

// Admin pages
import ManageInterviews from "./pages/Admin/ManageInterviews";
import ManageUsers from "./pages/Admin/ManageUsers";
import Reports from "./pages/Admin/Reports";
import Settings from "./pages/Admin/Settings";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

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
          path="/user/profile"
          element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          }
        />

        {/* Admin routes (with dashboard layout) */}
        <Route
          path="/admin/interviews"
          element={
            <DashboardLayout>
              <ManageInterviews />
            </DashboardLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <DashboardLayout>
              <ManageUsers />
            </DashboardLayout>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <DashboardLayout>
              <Reports />
            </DashboardLayout>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />

        {/* Default / fallback */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
