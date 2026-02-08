import React, { useState } from "react";
import { Link } from "react-router-dom";
import { mockUserInterviews } from "../../data/mockInterviews";

const statusLabel = (s) =>
  ({ scheduled: "Scheduled", completed: "Completed", selected: "Selected", rejected: "Rejected", cancelled: "Cancelled", pending: "Pending" }[s] || s);

const statusStyles = {
  scheduled: "bg-blue-50 text-blue-700",
  completed: "bg-gray-100 text-gray-700",
  selected: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-700",
  cancelled: "bg-amber-50 text-amber-700",
  pending: "bg-amber-50 text-amber-700",
};

const MyInterviews = () => {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "upcoming"
      ? mockUserInterviews.filter((i) => i.status === "scheduled")
      : filter === "past"
        ? mockUserInterviews.filter(
            (i) =>
              i.status !== "scheduled" &&
              ["completed", "selected", "rejected", "cancelled", "pending"].includes(i.status)
          )
        : mockUserInterviews;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">My Interviews</h2>
          <p className="text-sm text-gray-600">
            View all scheduled and past interviews. Status: scheduled, completed, pending, cancelled, selected, or rejected.
          </p>
        </div>
        <div className="flex rounded-lg border border-gray-200 p-0.5 bg-gray-50">
          {["all", "upcoming", "past"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md capitalize ${
                filter === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-500">
            <p className="text-sm">No interviews found for this filter.</p>
          </div>
        ) : (
          filtered.map((interview) => (
            <div
              key={interview.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-base font-semibold text-gray-900">{interview.role}</h3>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusStyles[interview.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {statusLabel(interview.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{interview.company}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {interview.date} at {interview.time} • {interview.mode}
                  {interview.interviewer && ` • ${interview.interviewer}`}
                </p>
                {interview.outcome && (
                  <p className="text-xs text-gray-600 mt-2 italic">Outcome: {interview.outcome}</p>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {interview.status === "scheduled" && interview.meetingLink && (
                  <a
                    href={interview.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-green-700 hover:text-green-800 border border-green-200 rounded-lg px-3 py-1.5"
                  >
                    Join meeting
                  </a>
                )}
                <Link
                  to={`/user/interviews/${interview.id}`}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-1.5"
                >
                  View details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyInterviews;
