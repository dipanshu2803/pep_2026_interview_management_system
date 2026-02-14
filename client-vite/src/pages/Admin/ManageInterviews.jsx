import React, { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { getAdminInterviews, getAdminUsers } from "../../services/adminService";
import { createInterview, updateInterview, statusToDisplay, formatDate } from "../../services/interviewService";

const MODE_OPTIONS = ["Online", "On-site"];

const STATUS_OPTIONS = [
  "Scheduled",
  "Pending feedback",
  "Completed",
  "Cancelled",
  "Selected",
  "Rejected",
];

const statusClasses = {
  Scheduled: "bg-blue-50 text-blue-700",
  "Pending feedback": "bg-amber-50 text-amber-700",
  Completed: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-red-50 text-red-700",
  Selected: "bg-green-50 text-green-700",
  Rejected: "bg-red-50 text-red-700",
};

function mapServerInterview(interview) {
  const user = interview.user || {};
  return {
    id: interview._id,
    userId: user._id,
    candidate: user.fullName || "—",
    role: interview.role,
    company: interview.company,
    date: formatDate(interview.date),
    time: interview.time,
    status: statusToDisplay[interview.status] || interview.status,
    mode: interview.mode || "Online",
    interviewer: interview.interviewer || "—",
    interviewerEmail: interview.interviewerEmail,
  };
}

const ManageInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [editing, setEditing] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [cancelId, setCancelId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [interviewsRes, usersRes] = await Promise.all([
        getAdminInterviews(),
        getAdminUsers(),
      ]);
      setInterviews(Array.isArray(interviewsRes) ? interviewsRes.map(mapServerInterview) : []);
      const users = Array.isArray(usersRes) ? usersRes : [];
      setCandidates(users.filter((u) => u.role === "candidate"));
      setInterviewers(users.filter((u) => u.role === "interviewer"));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load data");
      setInterviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredInterviews = useMemo(() => {
    return interviews.filter((i) => {
      if (statusFilter && i.status !== statusFilter) return false;
      if (roleFilter && !i.role.toLowerCase().includes(roleFilter.toLowerCase()))
        return false;
      return true;
    });
  }, [interviews, statusFilter, roleFilter]);

  const openNew = () => {
    setIsNew(true);
    const firstCandidate = candidates[0];
    const firstInterviewer = interviewers[0];
    setEditing({
      id: null,
      userId: firstCandidate?._id || "",
      candidate: firstCandidate?.fullName || "",
      role: "",
      company: "",
      interviewer: firstInterviewer?.fullName || "",
      interviewerEmail: firstInterviewer?.email || "",
      date: "",
      time: "",
      status: "Scheduled",
      mode: "Online",
      overrideConflict: false,
    });
  };

  const openEdit = (row) => {
    setIsNew(false);
    setEditing({ ...row, overrideConflict: false });
  };

  const saveEditing = async () => {
    if (!editing.role?.trim() || !editing.company?.trim() || !editing.date || !editing.time) {
      toast.error("Please fill role, company, date and time.");
      return;
    }
    if (isNew && !editing.userId) {
      toast.error("Please select a candidate.");
      return;
    }
    const conflict = interviews.find(
      (i) =>
        i.id !== editing.id &&
        i.interviewer === editing.interviewer &&
        i.date === editing.date &&
        i.time === editing.time &&
        i.status === "Scheduled"
    );
    if (conflict && !editing.overrideConflict) {
      toast.warn("Check override conflict to save.");
      return;
    }
    setSaving(true);
    try {
      if (isNew) {
        await createInterview({
          userId: editing.userId,
          role: editing.role,
          company: editing.company,
          date: editing.date,
          time: editing.time,
          mode: editing.mode || "Online",
          status: editing.status,
          interviewer: editing.interviewer,
          interviewerEmail: editing.interviewerEmail,
        });
        toast.success("Interview scheduled.");
      } else {
        await updateInterview(editing.id, {
          role: editing.role,
          company: editing.company,
          date: editing.date,
          time: editing.time,
          mode: editing.mode,
          status: editing.status,
          interviewer: editing.interviewer,
          interviewerEmail: editing.interviewerEmail,
        });
        toast.success("Interview updated.");
      }
      await loadData();
      setEditing(null);
      setIsNew(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const confirmCancel = async () => {
    if (!cancelId) return;
    try {
      await updateInterview(cancelId, { status: "cancelled" });
      toast.success("Interview cancelled.");
      await loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Cancel failed.");
    }
    setCancelId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Admin – Interview Scheduling
          </h2>
          <p className="text-sm text-gray-600">
            Schedule interviews, assign interviewers, reschedule or cancel, and handle conflicts.
          </p>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="self-start md:self-auto inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700"
        >
          Schedule interview
        </button>
      </div>

      {loading && (
        <p className="text-sm text-gray-600">Loading…</p>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase">
            Total interviews
          </p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {interviews.length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase">
            Scheduled
          </p>
          <p className="mt-2 text-3xl font-semibold text-blue-600">
            {interviews.filter((i) => i.status === "Scheduled").length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <p className="text-xs font-medium text-gray-500 uppercase">
            Pending feedback
          </p>
          <p className="mt-2 text-3xl font-semibold text-amber-600">
            {interviews.filter((i) => i.status === "Pending feedback").length}
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
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white"
            >
              <option value="">All statuses</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white"
            >
              <option value="">All roles</option>
              <option value="engineer">Engineering</option>
              <option value="data">Data</option>
              <option value="devops">DevOps</option>
            </select>
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
                  Interviewer
                </th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">
                  Date & time
                </th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">
                  Mode
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
              {filteredInterviews.map((row) => (
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
                    {row.interviewer || "—"}
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-700">
                    {row.date} at {row.time}
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-700">
                    {row.mode || "—"}
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
                    <button
                      type="button"
                      className="mr-2 text-green-700 hover:text-green-800"
                      onClick={() => openEdit(row)}
                    >
                      Edit
                    </button>
                    {row.status !== "Cancelled" && (
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-800"
                        onClick={() => setCancelId(row.id)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredInterviews.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-4 text-xs text-gray-500 text-center"
                  >
                    No interviews for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit modal */}
      {editing && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            aria-hidden
            onClick={() => {
              setEditing(null);
              setIsNew(false);
            }}
          />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-xl p-6 z-50 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isNew ? "Schedule interview" : "Edit interview"}
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Candidate
                </label>
                <select
                  value={editing.userId || ""}
                  onChange={(e) => {
                    const u = candidates.find((c) => c._id === e.target.value);
                    setEditing((prev) => ({
                      ...prev,
                      userId: e.target.value,
                      candidate: u?.fullName || "",
                    }));
                  }}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white"
                  disabled={!isNew}
                >
                  <option value="">Select candidate</option>
                  {candidates.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.fullName} ({c.email})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Role / position
                  </label>
                  <input
                    type="text"
                    value={editing.role}
                    onChange={(e) =>
                      setEditing((prev) => ({ ...prev, role: e.target.value }))
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    placeholder="e.g. Backend Engineer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={editing.company}
                    onChange={(e) =>
                      setEditing((prev) => ({ ...prev, company: e.target.value }))
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    placeholder="Company name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Interviewer
                </label>
                <select
                  value={interviewers.find((i) => i.fullName === editing.interviewer)?._id || ""}
                  onChange={(e) => {
                    const u = interviewers.find((i) => i._id === e.target.value);
                    setEditing((prev) => ({
                      ...prev,
                      interviewer: u?.fullName || "",
                      interviewerEmail: u?.email || "",
                    }));
                  }}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white"
                >
                  <option value="">Select interviewer</option>
                  {interviewers.map((int) => (
                    <option key={int._id} value={int._id}>
                      {int.fullName} ({int.email})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={editing.date}
                    onChange={(e) =>
                      setEditing((prev) => ({ ...prev, date: e.target.value }))
                    }
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    value={editing.time}
                    onChange={(e) =>
                      setEditing((prev) => ({ ...prev, time: e.target.value }))
                    }
                    placeholder="e.g. 3:00 PM"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Mode
                </label>
                <select
                  value={editing.mode || "Online"}
                  onChange={(e) =>
                    setEditing((prev) => ({ ...prev, mode: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white"
                >
                  {MODE_OPTIONS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={editing.status}
                  onChange={(e) =>
                    setEditing((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              {(() => {
                const conflict = interviews.find(
                  (i) =>
                    i.id !== editing.id &&
                    i.interviewer === editing.interviewer &&
                    i.date === editing.date &&
                    i.time === editing.time &&
                    i.status === "Scheduled"
                );
                return conflict ? (
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-amber-50 border border-amber-200">
                    <input
                      type="checkbox"
                      checked={editing.overrideConflict || false}
                      onChange={(e) =>
                        setEditing((prev) => ({ ...prev, overrideConflict: e.target.checked }))
                      }
                    />
                    <span className="text-xs text-amber-800">
                      Override conflict (same interviewer, date & time)
                    </span>
                  </label>
                ) : null;
              })()}
            </div>
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setIsNew(false);
                }}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveEditing}
                disabled={saving}
                className="flex-1 py-2 rounded-lg bg-green-600 text-white font-medium text-sm hover:bg-green-700 disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              If there is a scheduling conflict, you must check &quot;Override conflict&quot; to save.
            </p>
          </div>
        </>
      )}

      {/* Cancel confirm */}
      {cancelId && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            aria-hidden
            onClick={() => setCancelId(null)}
          />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-xl shadow-xl p-6 z-50">
            <h3 className="text-lg font-semibold text-gray-900">Cancel interview?</h3>
            <p className="text-sm text-gray-500 mt-1">
              This will mark the interview as cancelled. Candidate and interviewer can be notified.
            </p>
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setCancelId(null)}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm"
              >
                Keep
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

export default ManageInterviews;

