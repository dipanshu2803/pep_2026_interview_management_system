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

// User pages
import UserDashboard from "./pages/User/UserDashboard";
import ScheduleInterview from "./pages/User/ScheduleInterview";
import MyInterviews from "./pages/User/MyInterviews";
import Profile from "./pages/User/Profile";

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
