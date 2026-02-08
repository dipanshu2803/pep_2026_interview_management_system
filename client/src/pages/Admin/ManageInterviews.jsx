import React from "react";

const mockAdminInterviews = [
  {
    id: "#INT-1024",
    candidate: "Aarav Sharma",
    role: "Full Stack Engineer",
    date: "Today, 2:00 PM",
    status: "Scheduled",
  },
  {
    id: "#INT-1023",
    candidate: "Neha Patel",
    role: "Data Analyst",
    date: "Today, 4:30 PM",
    status: "Pending feedback",
  },
  {
    id: "#INT-1022",
    candidate: "Rohan Gupta",
    role: "DevOps Engineer",
    date: "Yesterday",
    status: "Completed",
  },
];

const statusClasses = {
  Scheduled: "bg-blue-50 text-blue-700",
  "Pending feedback": "bg-amber-50 text-amber-700",
  Completed: "bg-emerald-50 text-emerald-700",
};

const ManageInterviews = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Admin – Manage Interviews
        </h2>
        <p className="text-sm text-gray-600">
          Monitor all interviews across the organization, triage pending items,
          and keep the pipeline moving.
        </p>
      </div>

      {/* Admin overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase">
            Interviews today
          </p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">8</p>
          <p className="mt-1 text-xs text-gray-500">
            Across all roles and locations.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase">
            Pending feedback
          </p>
          <p className="mt-2 text-3xl font-semibold text-amber-500">3</p>
          <p className="mt-1 text-xs text-gray-500">
            Nudge interviewers to complete scorecards.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase">
            Offers in progress
          </p>
          <p className="mt-2 text-3xl font-semibold text-emerald-600">2</p>
          <p className="mt-1 text-xs text-gray-500">
            Candidates currently in the offer stage.
          </p>
        </div>
      </div>

      {/* Filters + table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-4 py-3 border-b border-gray-100 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h3 className="text-sm font-semibold text-gray-900">
            Interview queue
          </h3>
          <div className="flex flex-wrap gap-2">
            <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white">
              <option>All statuses</option>
              <option>Scheduled</option>
              <option>Pending feedback</option>
              <option>Completed</option>
            </select>
            <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white">
              <option>All roles</option>
              <option>Engineering</option>
              <option>Data</option>
              <option>Design</option>
            </select>
            <button className="text-xs px-3 py-1 rounded-lg bg-gray-900 text-white">
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">
                  ID
                </th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">
                  Candidate
                </th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">
                  Role
                </th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">
                  Date
                </th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">
                  Status
                </th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockAdminInterviews.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-2 text-xs text-gray-700">
                    {row.id}
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-900 font-medium">
                    {row.candidate}
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-700">
                    {row.role}
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-700">
                    {row.date}
                  </td>
                  <td className="px-4 py-2 text-xs">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                        statusClasses[row.status] || "bg-gray-50 text-gray-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-xs">
                    <button className="mr-2 text-green-700 hover:text-green-800">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      Reschedule
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageInterviews;

