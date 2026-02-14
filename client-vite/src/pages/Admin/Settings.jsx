import React, { useState } from "react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const initialSettings = {
  interviewDurationMinutes: 45,
  workingHoursStart: "09:00",
  workingHoursEnd: "18:00",
  workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  holidays: ["2025-12-25", "2025-01-01"],
  defaultInterviewMode: "Online",
  platformName: "PEP Interview Portal",
  emailFromName: "PEP Interviews",
};

const Settings = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [newHoliday, setNewHoliday] = useState("");
  const [saved, setSaved] = useState(false);

  const update = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const toggleWorkingDay = (day) => {
    const next = settings.workingDays.includes(day)
      ? settings.workingDays.filter((d) => d !== day)
      : [...settings.workingDays, day];
    update("workingDays", next);
  };

  const addHoliday = () => {
    if (!newHoliday.trim()) return;
    if (settings.holidays.includes(newHoliday)) return;
    update("holidays", [...settings.holidays, newHoliday]);
    setNewHoliday("");
  };

  const removeHoliday = (date) => {
    update("holidays", settings.holidays.filter((d) => d !== date));
  };

  const saveAll = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
          <p className="text-sm text-gray-600">
            Interview duration, working hours, holidays, and platform options.
          </p>
        </div>
        <button
          type="button"
          onClick={saveAll}
          className="self-start md:self-auto inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700"
        >
          {saved ? "Saved" : "Save changes"}
        </button>
      </div>

      {/* Interview duration */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Interview duration</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={15}
            max={120}
            value={settings.interviewDurationMinutes}
            onChange={(e) =>
              update("interviewDurationMinutes", parseInt(e.target.value, 10) || 45)
            }
            className="w-24 rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <span className="text-sm text-gray-600">minutes (default slot length)</span>
        </div>
      </div>

      {/* Working hours */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Working hours</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Start</label>
            <input
              type="time"
              value={settings.workingHoursStart}
              onChange={(e) => update("workingHoursStart", e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">End</label>
            <input
              type="time"
              value={settings.workingHoursEnd}
              onChange={(e) => update("workingHoursEnd", e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Used for default availability and slot generation.</p>
      </div>

      {/* Working days */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Working days</h3>
        <div className="flex flex-wrap gap-3">
          {DAYS.map((day) => (
            <label key={day} className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.workingDays.includes(day)}
                onChange={() => toggleWorkingDay(day)}
              />
              <span className="text-sm">{day}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Holidays */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Holidays</h3>
        <p className="text-xs text-gray-600 mb-2">Dates when interviews are not scheduled (e.g. company holidays).</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {settings.holidays.map((d) => (
            <span
              key={d}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 text-sm text-gray-700"
            >
              {d}
              <button
                type="button"
                onClick={() => removeHoliday(d)}
                className="text-gray-500 hover:text-red-600"
                aria-label={`Remove ${d}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="date"
            value={newHoliday}
            onChange={(e) => setNewHoliday(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={addHoliday}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Add holiday
          </button>
        </div>
      </div>

      {/* Platform settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Platform settings</h3>
        <div className="space-y-3 text-sm">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Platform name</label>
            <input
              type="text"
              value={settings.platformName}
              onChange={(e) => update("platformName", e.target.value)}
              className="w-full max-w-md rounded-lg border border-gray-200 px-3 py-2"
              placeholder="e.g. PEP Interview Portal"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Default interview mode</label>
            <select
              value={settings.defaultInterviewMode}
              onChange={(e) => update("defaultInterviewMode", e.target.value)}
              className="rounded-lg border border-gray-200 px-3 py-2 bg-white"
            >
              <option value="Online">Online</option>
              <option value="On-site">On-site</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Email &quot;From&quot; name</label>
            <input
              type="text"
              value={settings.emailFromName}
              onChange={(e) => update("emailFromName", e.target.value)}
              className="w-full max-w-md rounded-lg border border-gray-200 px-3 py-2"
              placeholder="Sender name for emails"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
