import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const stats = {
  totalUsers: 124,
  totalInterviews: 89,
  interviewsToday: 8,
  pendingInterviews: 12,
};

const interviewsPerDay = [
  { day: "Mon", count: 14 },
  { day: "Tue", count: 18 },
  { day: "Wed", count: 12 },
  { day: "Thu", count: 22 },
  { day: "Fri", count: 15 },
  { day: "Sat", count: 5 },
  { day: "Sun", count: 3 },
];

const selectionRatioData = [
  { name: "Selected", value: 34, color: "#16a34a" },
  { name: "Rejected", value: 28, color: "#dc2626" },
  { name: "Pending", value: 27, color: "#d97706" },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h2>
        <p className="text-sm text-gray-600">
          Overview of users, interviews, and selection metrics.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs font-medium text-gray-500 uppercase">Total users</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.totalUsers}</p>
          <Link to="/admin/users" className="mt-2 inline-block text-xs font-medium text-green-600 hover:text-green-700">
            View all →
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs font-medium text-gray-500 uppercase">Total interviews</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.totalInterviews}</p>
          <Link to="/admin/interviews" className="mt-2 inline-block text-xs font-medium text-green-600 hover:text-green-700">
            Manage →
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs font-medium text-gray-500 uppercase">Interviews today</p>
          <p className="mt-2 text-3xl font-semibold text-blue-600">{stats.interviewsToday}</p>
          <p className="mt-1 text-xs text-gray-500">Scheduled for today</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p className="text-xs font-medium text-gray-500 uppercase">Pending interviews</p>
          <p className="mt-2 text-3xl font-semibold text-amber-600">{stats.pendingInterviews}</p>
          <p className="mt-1 text-xs text-gray-500">Awaiting feedback</p>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interviews per day/week */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Interviews per day (this week)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={interviewsPerDay} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Interviews" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Selection ratio */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Selection ratio
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={selectionRatioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {selectionRatioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} interviews`, "Count"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/admin/interviews"
          className="bg-green-50 border border-green-100 rounded-xl p-4 hover:bg-green-100 transition-colors"
        >
          <p className="text-sm font-semibold text-green-800">Interview scheduling</p>
          <p className="mt-1 text-xs text-green-700">Schedule, edit, cancel interviews.</p>
        </Link>
        <Link
          to="/admin/interviewers"
          className="bg-white border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors"
        >
          <p className="text-sm font-semibold text-gray-900">Interviewers</p>
          <p className="mt-1 text-xs text-gray-600">Add interviewers, skills, availability.</p>
        </Link>
        <Link
          to="/admin/users"
          className="bg-white border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors"
        >
          <p className="text-sm font-semibold text-gray-900">Users</p>
          <p className="mt-1 text-xs text-gray-600">Roles and access.</p>
        </Link>
        <Link
          to="/admin/feedback"
          className="bg-white border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors"
        >
          <p className="text-sm font-semibold text-gray-900">Feedback & results</p>
          <p className="mt-1 text-xs text-gray-600">Add feedback, set result, visibility.</p>
        </Link>
        <Link
          to="/admin/notifications"
          className="bg-white border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors"
        >
          <p className="text-sm font-semibold text-gray-900">Notifications</p>
          <p className="mt-1 text-xs text-gray-600">Announcements and reminders.</p>
        </Link>
        <Link
          to="/admin/settings"
          className="bg-white border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors"
        >
          <p className="text-sm font-semibold text-gray-900">Settings</p>
          <p className="mt-1 text-xs text-gray-600">Duration, hours, holidays.</p>
        </Link>
        <Link
          to="/admin/reports"
          className="bg-white border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors"
        >
          <p className="text-sm font-semibold text-gray-900">Reports</p>
          <p className="mt-1 text-xs text-gray-600">Analytics and exports.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
