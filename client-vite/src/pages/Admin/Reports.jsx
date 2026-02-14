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
  LineChart,
  Line,
} from "recharts";

const interviewsByMonth = [
  { month: "Sep", scheduled: 22, completed: 20 },
  { month: "Oct", scheduled: 28, completed: 26 },
  { month: "Nov", scheduled: 35, completed: 32 },
  { month: "Dec", scheduled: 30, completed: 28 },
  { month: "Jan", scheduled: 38, completed: 34 },
];

const byRole = [
  { role: "Engineering", count: 45 },
  { role: "Data", count: 22 },
  { role: "Product", count: 18 },
  { role: "Other", count: 12 },
];

const Reports = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h2>
          <p className="text-sm text-gray-600">
            Interview metrics, trends, and export options.
          </p>
        </div>
        <button
          type="button"
          className="self-start md:self-auto inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50"
        >
          Export CSV (placeholder)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Interviews by month (scheduled vs completed)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={interviewsByMonth} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="scheduled" name="Scheduled" stroke="#16a34a" strokeWidth={2} />
                <Line type="monotone" dataKey="completed" name="Completed" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Interviews by role
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byRole} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="role" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Interviews" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-2">Quick links</h3>
        <p className="text-sm text-gray-600 mb-4">
          For detailed interview list and feedback, use the scheduling and feedback pages.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/interviews"
            className="text-sm font-medium text-green-600 hover:text-green-700"
          >
            Interview list →
          </Link>
          <Link
            to="/admin/feedback"
            className="text-sm font-medium text-green-600 hover:text-green-700"
          >
            Feedback & results →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reports;
