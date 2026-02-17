import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getStoredUser } from "../../services/authService";
import { getUserInterviews } from "../../services/interviewService";

const resultLabel = (status) =>
  ({ selected: "Selected", rejected: "Rejected", pending: "Pending", completed: "Completed" }[status] || status);

const resultStyles = {
  selected: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-700",
  pending: "bg-amber-50 text-amber-700",
  completed: "bg-gray-100 text-gray-700",
};

const Feedback = () => {
  const user = getStoredUser();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingId, setViewingId] = useState(null);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    getUserInterviews(user.id)
      .then((list) => setInterviews(list || []))
      .catch(() => setInterviews([]))
      .finally(() => setLoading(false));
  }, [user?.id]);

  const completed = interviews.filter((i) =>
    ["selected", "rejected", "pending", "completed"].includes(i.status)
  );
  const viewing = completed.find((i) => i.id === viewingId);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Feedback (Post Interview)</h2>
        <p className="text-sm text-gray-600">
          Interview completed. View feedback when shared by the interviewer and see your result (Selected / Rejected / Pending).
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-sm">Loading…</p>
          </div>
        ) : completed.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-sm">No completed interviews yet. Feedback from admin will appear here when shared.</p>
            <Link to="/user/interviews" className="mt-2 inline-block text-sm font-medium text-green-600 hover:text-green-700">
              My Interviews
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-700">Interview</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Completed</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Result</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Feedback</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {completed.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{item.role}</p>
                        <p className="text-xs text-gray-500">{item.company} · {item.interviewer}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {item.date} at {item.time}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          resultStyles[item.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {resultLabel(item.status)}
                      </span>
                      {item.outcome && (
                        <p className="text-xs text-gray-500 mt-0.5">{item.outcome}</p>
                      )}
                      {item.notes && !item.feedback && (
                        <p className="text-xs text-gray-500 mt-0.5">{item.notes}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {item.feedbackVisibleToCandidate && item.feedback ? (
                        <button
                          type="button"
                          onClick={() => setViewingId(item.id)}
                          className="text-green-700 font-medium hover:text-green-800 underline"
                        >
                          View feedback
                        </button>
                      ) : (
                        <span className="text-gray-400">
                          {item.status === "pending" ? "Not yet shared" : "Not available"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View feedback modal */}
      {viewing && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            aria-hidden
            onClick={() => setViewingId(null)}
          />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-xl p-6 z-50 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900">Interview feedback</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              {viewing.role} · {viewing.company} · {viewing.date}
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-800 whitespace-pre-wrap">{viewing.feedback}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setViewingId(null)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Feedback;
