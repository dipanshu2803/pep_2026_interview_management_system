import React, { useState } from "react";
import { Link } from "react-router-dom";
import { mockUserInterviews } from "../../data/mockInterviews";

const STATUS_SCHEDULED = "scheduled";
const STATUS_COMPLETED = "completed";
const STATUS_CANCELLED = "cancelled";

const statusDisplay = (s) => {
  if (s === STATUS_SCHEDULED) return "Scheduled";
  if (s === STATUS_CANCELLED) return "Cancelled";
  return "Completed"; // completed, selected, rejected, pending
};

const statusClass = {
  [STATUS_SCHEDULED]: "bg-blue-50 text-blue-700",
  [STATUS_CANCELLED]: "bg-amber-50 text-amber-700",
  [STATUS_COMPLETED]: "bg-gray-100 text-gray-700",
};

const getStatusBucket = (status) => {
  if (status === STATUS_SCHEDULED) return STATUS_SCHEDULED;
  if (status === STATUS_CANCELLED) return STATUS_CANCELLED;
  return STATUS_COMPLETED;
};

const UserDashboard = () => {
  const [interviews, setInterviews] = useState(() => [...mockUserInterviews]);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [cancelId, setCancelId] = useState(null);

  const upcoming = interviews.filter((i) => i.status === STATUS_SCHEDULED);
  const scheduledCount = interviews.filter((i) => i.status === STATUS_SCHEDULED).length;
  const completedCount = interviews.filter((i) => getStatusBucket(i.status) === STATUS_COMPLETED).length;
  const cancelledCount = interviews.filter((i) => i.status === STATUS_CANCELLED).length;

  const handleReschedule = (id) => {
    const inv = interviews.find((i) => i.id === id);
    if (inv) {
      setRescheduleId(id);
      setRescheduleDate(inv.date);
      setRescheduleTime(inv.time);
    }
  };

  const confirmReschedule = () => {
    if (!rescheduleId || !rescheduleDate || !rescheduleTime) return;
    setInterviews((prev) =>
      prev.map((i) =>
        i.id === rescheduleId
          ? { ...i, date: rescheduleDate, time: rescheduleTime }
          : i
      )
    );
    setRescheduleId(null);
    setRescheduleDate("");
    setRescheduleTime("");
  };

  const handleCancel = (id) => setCancelId(id);

  const confirmCancel = () => {
    if (!cancelId) return;
    setInterviews((prev) =>
      prev.map((i) =>
        i.id === cancelId ? { ...i, status: STATUS_CANCELLED, outcome: "Cancelled by you" } : i
      )
    );
    setCancelId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">User Dashboard</h2>
        <p className="text-sm text-gray-600">
          Upcoming interviews, status, and quick actions.
        </p>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase">Scheduled</p>
          <p className="mt-2 text-3xl font-semibold text-blue-600">{scheduledCount}</p>
          <p className="mt-1 text-xs text-gray-500">Upcoming interviews</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase">Completed</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{completedCount}</p>
          <p className="mt-1 text-xs text-gray-500">Done / outcome received</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase">Cancelled</p>
          <p className="mt-2 text-3xl font-semibold text-amber-600">{cancelledCount}</p>
          <p className="mt-1 text-xs text-gray-500">Cancelled interviews</p>
        </div>
      </div>

      {/* Upcoming interviews + quick actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Upcoming interviews</h3>
          <Link to="/user/interviews" className="text-xs font-medium text-green-700 hover:text-green-800">
            View all
          </Link>
        </div>
        <ul className="divide-y divide-gray-100">
          {upcoming.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-gray-500">
              No upcoming interviews.{" "}
              <Link to="/user/schedule" className="font-medium text-green-700 hover:text-green-800">
                Schedule one now.
              </Link>
            </li>
          ) : (
            upcoming.map((item) => (
              <li
                key={item.id}
                className="px-4 py-3 flex flex-wrap items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">{item.role}</p>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusClass[STATUS_SCHEDULED]}`}
                    >
                      Scheduled
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.company} · {item.date} at {item.time} · {item.mode}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={`/user/interviews/${item.id}`}
                    className="text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg px-2.5 py-1.5"
                  >
                    View details
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleReschedule(item.id)}
                    className="text-xs font-medium text-green-700 hover:text-green-800 border border-green-200 rounded-lg px-2.5 py-1.5 bg-green-50"
                  >
                    Reschedule
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCancel(item.id)}
                    className="text-xs font-medium text-red-700 hover:text-red-800 border border-red-200 rounded-lg px-2.5 py-1.5 bg-red-50"
                  >
                    Cancel
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* All interviews by status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Interview status</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Scheduled · Completed · Cancelled
          </p>
        </div>
        <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
          {interviews.length === 0 ? (
            <li className="px-4 py-6 text-center text-sm text-gray-500">No interviews.</li>
          ) : (
            interviews.map((item) => (
              <li key={item.id} className="px-4 py-2.5 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.role}</p>
                  <p className="text-xs text-gray-500">{item.company} · {item.date}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      statusClass[getStatusBucket(item.status)] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {statusDisplay(getStatusBucket(item.status))}
                  </span>
                  <Link
                    to={`/user/interviews/${item.id}`}
                    className="text-xs font-medium text-green-700 hover:text-green-800"
                  >
                    Details
                  </Link>
                </div>
              </li>
            ))
          )}
        </ul>
        <div className="px-4 py-2 border-t border-gray-100">
          <Link to="/user/interviews" className="text-xs font-medium text-green-700 hover:text-green-800">
            View all in My Interviews →
          </Link>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/user/schedule"
          className="bg-green-50 border border-green-100 rounded-xl p-4 hover:bg-green-100 transition-colors"
        >
          <p className="text-sm font-semibold text-green-800">Schedule a new interview</p>
          <p className="mt-1 text-xs text-green-900/80">Pick role and time slot.</p>
        </Link>
        <Link
          to="/user/interviews"
          className="bg-white border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors"
        >
          <p className="text-sm font-semibold text-gray-900">My interviews</p>
          <p className="mt-1 text-xs text-gray-600">Full list and filters.</p>
        </Link>
      </div>

      {/* Reschedule modal */}
      {rescheduleId !== null && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            aria-hidden
            onClick={() => setRescheduleId(null)}
          />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-xl shadow-xl p-6 z-50">
            <h3 className="text-lg font-semibold text-gray-900">Reschedule interview</h3>
            <p className="text-sm text-gray-500 mt-1">Choose new date and time.</p>
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="text"
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  placeholder="e.g. 3:00 PM"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setRescheduleId(null)}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm"
              >
                Back
              </button>
              <button
                type="button"
                onClick={confirmReschedule}
                className="flex-1 py-2 rounded-lg bg-green-600 text-white font-medium text-sm hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </>
      )}

      {/* Cancel confirm */}
      {cancelId !== null && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            aria-hidden
            onClick={() => setCancelId(null)}
          />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-xl shadow-xl p-6 z-50">
            <h3 className="text-lg font-semibold text-gray-900">Cancel interview?</h3>
            <p className="text-sm text-gray-500 mt-1">
              This will mark the interview as cancelled. You can request a new slot later.
            </p>
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setCancelId(null)}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm"
              >
                Keep it
              </button>
              <button
                type="button"
                onClick={confirmCancel}
                className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium text-sm hover:bg-red-700"
              >
                Cancel interview
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
