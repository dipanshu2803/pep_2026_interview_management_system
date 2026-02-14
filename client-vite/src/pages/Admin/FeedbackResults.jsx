import React, { useState } from "react";
import { mockFeedbackList as initialList, RESULT_OPTIONS } from "../../data/mockFeedback";

const FeedbackResults = () => {
  const [items, setItems] = useState(initialList);
  const [editing, setEditing] = useState(null);
  const [resultFilter, setResultFilter] = useState("");

  const filtered = resultFilter
    ? items.filter((i) => i.result === resultFilter)
    : items;

  const openEdit = (row) => {
    setEditing({ ...row });
  };

  const save = () => {
    if (!editing) return;
    setItems((prev) =>
      prev.map((i) => (i.id === editing.id ? editing : i))
    );
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Feedback & Results</h2>
          <p className="text-sm text-gray-600">
            Add interview feedback, update result, and control visibility to the candidate.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <select
          value={resultFilter}
          onChange={(e) => setResultFilter(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white"
        >
          <option value="">All results</option>
          {RESULT_OPTIONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">ID</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">Candidate</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">Interviewer</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">Date & time</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">Result</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">Visible to user</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-2 text-gray-700">{row.id}</td>
                  <td className="px-4 py-2 font-medium text-gray-900">{row.candidateName}</td>
                  <td className="px-4 py-2 text-gray-700">{row.interviewerName}</td>
                  <td className="px-4 py-2 text-gray-700">{row.date} at {row.time}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        row.result === "Selected"
                          ? "bg-green-50 text-green-700"
                          : row.result === "Rejected"
                            ? "bg-red-50 text-red-700"
                            : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {row.result}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {row.visibleToCandidate ? (
                      <span className="text-green-600 text-xs">Yes</span>
                    ) : (
                      <span className="text-gray-500 text-xs">No</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      type="button"
                      className="text-green-700 hover:text-green-800"
                      onClick={() => openEdit(row)}
                    >
                      Edit feedback
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-4 text-gray-500 text-center">
                    No items for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            aria-hidden
            onClick={() => setEditing(null)}
          />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-xl p-6 z-50 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit feedback & result</h3>
            <p className="text-xs text-gray-600 mb-3">{editing.candidateName} · {editing.id}</p>
            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Result</label>
                <select
                  value={editing.result}
                  onChange={(e) => setEditing((p) => ({ ...p, result: e.target.value }))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white"
                >
                  {RESULT_OPTIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Feedback (for admin / visible to candidate if enabled)</label>
                <textarea
                  value={editing.feedbackText || ""}
                  onChange={(e) => setEditing((p) => ({ ...p, feedbackText: e.target.value }))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 min-h-[100px]"
                  placeholder="Add or edit feedback..."
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editing.visibleToCandidate || false}
                  onChange={(e) =>
                    setEditing((p) => ({ ...p, visibleToCandidate: e.target.checked }))
                  }
                />
                <span className="text-sm">Make feedback visible to candidate</span>
              </label>
            </div>
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={save}
                className="flex-1 py-2 rounded-lg bg-green-600 text-white font-medium text-sm hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FeedbackResults;
