import React from "react";
import { useParams, Link } from "react-router-dom";
import { getInterviewById } from "../../data/mockInterviews";

const statusLabel = (s) =>
  ({ scheduled: "Scheduled", completed: "Completed", selected: "Selected", rejected: "Rejected", cancelled: "Cancelled", pending: "Pending" }[s] || s);

const statusClass = {
  scheduled: "bg-blue-50 text-blue-700",
  completed: "bg-gray-100 text-gray-700",
  selected: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-700",
  cancelled: "bg-amber-50 text-amber-700",
  pending: "bg-amber-50 text-amber-700",
};

const InterviewDetail = () => {
  const { id } = useParams();
  const interview = getInterviewById(id);

  if (!interview) {
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
            <h2 className="text-xl font-semibold text-gray-900">{interview.role}</h2>
            <p className="text-sm text-gray-600">{interview.company}</p>
          </div>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusClass[interview.status] || "bg-gray-100 text-gray-700"}`}
          >
            {statusLabel(interview.status)}
          </span>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Date & time</p>
              <p className="text-sm font-medium text-gray-900 mt-0.5">
                {interview.date} at {interview.time}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Mode</p>
              <p className="text-sm font-medium text-gray-900 mt-0.5">{interview.mode}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Interviewer</p>
              <p className="text-sm font-medium text-gray-900 mt-0.5">{interview.interviewer}</p>
              {interview.interviewerEmail && (
                <a
                  href={`mailto:${interview.interviewerEmail}`}
                  className="text-xs text-green-600 hover:text-green-700"
                >
                  {interview.interviewerEmail}
                </a>
              )}
            </div>
            {interview.platform && (
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase">Platform</p>
                <p className="text-sm font-medium text-gray-900 mt-0.5">{interview.platform}</p>
              </div>
            )}
          </div>

          {interview.meetingLink && (
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase mb-1">Meeting link</p>
              <a
                href={interview.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-green-700 hover:text-green-800"
              >
                {interview.meetingLink}
              </a>
            </div>
          )}

          {interview.address && (
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Venue</p>
              <p className="text-sm text-gray-900 mt-0.5">{interview.address}</p>
            </div>
          )}

          {interview.outcome && (
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Outcome</p>
              <p className="text-sm text-gray-900 mt-0.5">{interview.outcome}</p>
            </div>
          )}

          {interview.notes && (
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase">Notes</p>
              <p className="text-sm text-gray-700 mt-0.5">{interview.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewDetail;
