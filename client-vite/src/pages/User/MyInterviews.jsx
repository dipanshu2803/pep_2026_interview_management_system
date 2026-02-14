import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getStoredUser } from "../../services/authService";
import { getUserInterviews } from "../../services/interviewService";

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

const modeLabel = (m) => (m === "Online" ? "Online" : m === "On-site" ? "On-site" : "Offline");

const MyInterviews = () => {
  const user = getStoredUser();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    getUserInterviews(user.id)
      .then((data) => { if (!cancelled) setInterviews(data); })
      .catch(() => { if (!cancelled) setInterviews([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [user?.id]);

  const filtered =
    filter === "upcoming"
      ? interviews.filter((i) => i.status === "scheduled")
      : filter === "past"
        ? interviews.filter(
            (i) =>
              i.status !== "scheduled" &&
              ["completed", "selected", "rejected", "cancelled", "pending"].includes(i.status)
          )
        : interviews;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">My Interviews</h2>
          <p className="text-sm text-gray-600">
            Table view: interviewer, date & time, mode, status, and join link when online.
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

      {loading && <p className="text-sm text-gray-600">Loading…</p>}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filtered.length === 0 && !loading ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-sm">No interviews found for this filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-700">Interviewer</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Date & time</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Mode</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Join meeting</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((interview) => (
                  <tr key={interview.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{interview.interviewer || "—"}</p>
                        <p className="text-xs text-gray-500">{interview.company} · {interview.role}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {interview.date} at {interview.time}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          interview.mode === "Online"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {modeLabel(interview.mode)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          statusStyles[interview.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {statusLabel(interview.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {interview.mode === "Online" && interview.meetingLink ? (
                        <a
                          href={interview.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-700 font-medium hover:text-green-800 underline"
                        >
                          Join meeting
                        </a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/user/interviews/${interview.id}`}
                        className="text-green-700 font-medium hover:text-green-800"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInterviews;
