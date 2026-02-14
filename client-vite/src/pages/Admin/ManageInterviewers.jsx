import React, { useState } from "react";
import { mockInterviewers as initialInterviewers } from "../../data/mockInterviewers";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DEFAULT_SKILLS = ["React", "Node.js", "Backend", "Frontend", "System Design", "Databases", "DevOps", "Full Stack", "Data"];

const ManageInterviewers = () => {
  const [interviewers, setInterviewers] = useState(initialInterviewers);
  const [editing, setEditing] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [skillFilter, setSkillFilter] = useState("");

  const filteredList = skillFilter
    ? interviewers.filter((i) => i.skills?.some((s) => s.toLowerCase().includes(skillFilter.toLowerCase())))
    : interviewers;

  const openNew = () => {
    setIsNew(true);
    setEditing({
      id: `int-${Date.now()}`,
      fullName: "",
      email: "",
      skills: [],
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      timeRange: "9:00 AM – 6:00 PM",
      enabled: true,
    });
  };

  const openEdit = (row) => {
    setIsNew(false);
    setEditing({ ...row, skills: [...(row.skills || [])], days: [...(row.days || [])] });
  };

  const toggleSkill = (skill) => {
    if (!editing) return;
    const next = editing.skills.includes(skill)
      ? editing.skills.filter((s) => s !== skill)
      : [...editing.skills, skill];
    setEditing((prev) => ({ ...prev, skills: next }));
  };

  const toggleDay = (day) => {
    if (!editing) return;
    const next = editing.days.includes(day)
      ? editing.days.filter((d) => d !== day)
      : [...editing.days, day];
    setEditing((prev) => ({ ...prev, days: next }));
  };

  const addCustomSkill = (e) => {
    if (e.key !== "Enter" || !editing) return;
    const val = e.target.value?.trim();
    if (val && !editing.skills.includes(val)) {
      setEditing((prev) => ({ ...prev, skills: [...prev.skills, val] }));
      e.target.value = "";
    }
  };

  const save = () => {
    if (!editing?.fullName?.trim() || !editing?.email?.trim()) return;
    setInterviewers((prev) => {
      const exists = prev.some((i) => i.id === editing.id);
      if (exists) return prev.map((i) => (i.id === editing.id ? editing : i));
      return [editing, ...prev];
    });
    setEditing(null);
    setIsNew(false);
  };

  const toggleEnabled = (id) => {
    setInterviewers((prev) =>
      prev.map((i) => (i.id === id ? { ...i, enabled: !i.enabled } : i))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Interviewer Management</h2>
          <p className="text-sm text-gray-600">
            Add interviewers, assign skills, set availability, and enable or disable.
          </p>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="self-start md:self-auto inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700"
        >
          Add interviewer
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Filter by skill"
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm w-48"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">Name</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">Email</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">Skills</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">Availability</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">Status</th>
                <th className="px-4 py-2 text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredList.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-2 font-medium text-gray-900">{row.fullName}</td>
                  <td className="px-4 py-2 text-gray-700">{row.email}</td>
                  <td className="px-4 py-2">
                    <span className="text-gray-700">
                      {row.skills?.join(", ") || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {row.days?.join(", ") || "—"} · {row.timeRange || "—"}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      type="button"
                      onClick={() => toggleEnabled(row.id)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        row.enabled ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {row.enabled ? "Enabled" : "Disabled"}
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      type="button"
                      className="text-green-700 hover:text-green-800"
                      onClick={() => openEdit(row)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-gray-500 text-center">
                    No interviewers match.
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
            onClick={() => { setEditing(null); setIsNew(false); }}
          />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-xl p-6 z-50 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isNew ? "Add interviewer" : "Edit interviewer"}
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full name</label>
                <input
                  type="text"
                  value={editing.fullName}
                  onChange={(e) => setEditing((p) => ({ ...p, fullName: e.target.value }))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2"
                  placeholder="e.g. Jane Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editing.email}
                  onChange={(e) => setEditing((p) => ({ ...p, email: e.target.value }))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Skills</label>
                <div className="flex flex-wrap gap-1 mb-2">
                  {DEFAULT_SKILLS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSkill(s)}
                      className={`px-2 py-0.5 rounded text-xs ${
                        editing.skills.includes(s) ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Type and press Enter to add custom skill"
                  onKeyDown={addCustomSkill}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs"
                />
                {editing.skills.length > 0 && (
                  <p className="mt-1 text-xs text-gray-500">Selected: {editing.skills.join(", ")}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Available days</label>
                <div className="flex flex-wrap gap-2">
                  {DAYS.map((d) => (
                    <label key={d} className="inline-flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={editing.days.includes(d)}
                        onChange={() => toggleDay(d)}
                      />
                      <span className="text-sm">{d}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Time range</label>
                <input
                  type="text"
                  value={editing.timeRange}
                  onChange={(e) => setEditing((p) => ({ ...p, timeRange: e.target.value }))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2"
                  placeholder="9:00 AM – 6:00 PM"
                />
              </div>
              {!isNew && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="enabled"
                    checked={editing.enabled}
                    onChange={(e) => setEditing((p) => ({ ...p, enabled: e.target.checked }))}
                  />
                  <label htmlFor="enabled" className="text-sm">Enabled</label>
                </div>
              )}
            </div>
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => { setEditing(null); setIsNew(false); }}
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

export default ManageInterviewers;
