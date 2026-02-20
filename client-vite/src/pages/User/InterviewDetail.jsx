import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getInterviewById as getInterviewByIdApi } from "../../services/interviewService";
import { formatDate } from "../../services/interviewService";

const statusLabel = (s) =>
  ({ scheduled: "Scheduled", completed: "Completed", selected: "Selected", rejected: "Rejected", cancelled: "Cancelled", pending: "Pending", pending_approval: "Pending approval" }[s] || s);

const statusClass = {
  scheduled: "bg-blue-50 text-blue-700",
  completed: "bg-gray-100 text-gray-700",
  selected: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-700",
  cancelled: "bg-amber-50 text-amber-700",
  pending: "bg-amber-50 text-amber-700",
  pending_approval: "bg-violet-50 text-violet-700",
};

/** Parse "3:00 PM" or "10:30 AM" to [hours, minutes]. */
function parseTime(timeStr) {
  if (!timeStr) return [0, 0];
  const match = String(timeStr).match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return [0, 0];
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const ampm = (match[3] || "").toUpperCase();
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return [h, m];
}

/** Build Google Calendar "Add event" URL for an interview. */
function buildAddToCalendarUrl(interview) {
  const dateStr = interview.date; // YYYY-MM-DD
  const [hours, minutes] = parseTime(interview.time);
  const duration = interview.duration ?? 60;
  const [y, m, d] = dateStr.split("-").map(Number);
  const start = new Date(y, m - 1, d, hours, minutes, 0);
  const end = new Date(start.getTime() + duration * 60 * 1000);
  const pad = (n) => String(n).padStart(2, "0");
  const startStr = `${start.getFullYear()}${pad(start.getMonth() + 1)}${pad(start.getDate())}T${pad(start.getHours())}${pad(start.getMinutes())}${pad(start.getSeconds())}`;
  const endStr = `${end.getFullYear()}${pad(end.getMonth() + 1)}${pad(end.getDate())}T${pad(end.getHours())}${pad(end.getMinutes())}${pad(end.getSeconds())}`;
  const title = encodeURIComponent(`Interview: ${interview.role || "Interview"} at ${interview.company || ""}`);
  const details = encodeURIComponent(interview.meetingLink ? `Join: ${interview.meetingLink}` : "Interview");
  const location = encodeURIComponent(interview.meetingLink || interview.address || "");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}`;
}

const InterviewDetail = () => {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getInterviewByIdApi(id)
      .then((inv) => setInterview(inv))
      .catch(() => setInterview(null))
      .finally(() => setLoading(false));
  }, [id]);

  const dateStr = interview?.date ? formatDate(interview.date) : "";
  const displayInterview = interview
    ? { ...interview, date: dateStr, duration: interview.duration ?? 60 }
    : null;

  if (loading) {
    return <p className="text-gray-600">Loading…</p>;
  }

  if (!displayInterview) {
    return (
      <div className="space-y-4">
        <p className="text-gray-600">Interview not found.</p>
        <Link to="/user/interviews" className="text-sm font-medium text-green-600 hover:text-green-700">
          Back to My Interviews
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to="/user/interviews"
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          ← My Interviews
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{displayInterview.role}</h2>
            <p className="text-sm text-gray-600">{displayInterview.company}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {displayInterview.status === "scheduled" && (
              <a
                href={buildAddToCalendarUrl(displayInterview)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700"
              >
                Add to calendar
              </a>
            )}
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusClass[displayInterview.status] || "bg-gray-100 text-gray-700"}`}
            >
              {statusLabel(displayInterview.status)}
            </span>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Date & time</p>
              <p className="text-sm font-medium text-gray-900 mt-0.5">
                {displayInterview.date} at {displayInterview.time}
                {displayInterview.duration ? ` (${displayInterview.duration} min)` : ""}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Mode</p>
              <p className="text-sm font-medium text-gray-900 mt-0.5">{displayInterview.mode || "—"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Interviewer</p>
              <p className="text-sm font-medium text-gray-900 mt-0.5">{displayInterview.interviewer || "—"}</p>
              {displayInterview.interviewerEmail && (
                <a
                  href={`mailto:${displayInterview.interviewerEmail}`}
                  className="text-xs text-green-600 hover:text-green-700"
                >
                  {displayInterview.interviewerEmail}
                </a>
              )}
            </div>
            {displayInterview.platform && (
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Platform</p>
                <p className="text-sm font-medium text-gray-900 mt-0.5">{displayInterview.platform}</p>
              </div>
            )}
          </div>

          {displayInterview.meetingLink && (
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase mb-1">Meeting link</p>
              <a
                href={displayInterview.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-green-700 hover:text-green-800"
              >
                {displayInterview.meetingLink}
              </a>
            </div>
          )}

          {displayInterview.address && (
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Venue</p>
              <p className="text-sm text-gray-900 mt-0.5">{displayInterview.address}</p>
            </div>
          )}

          {displayInterview.outcome && (
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Outcome</p>
              <p className="text-sm text-gray-900 mt-0.5">{displayInterview.outcome}</p>
            </div>
          )}

          {displayInterview.notes && (
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Notes</p>
              <p className="text-sm text-gray-700 mt-0.5">{displayInterview.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewDetail;
