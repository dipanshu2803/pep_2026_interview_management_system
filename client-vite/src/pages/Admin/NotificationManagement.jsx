import React, { useState } from "react";

const initialAnnouncements = [
  {
    id: "ann-1",
    title: "New interview slots open",
    body: "We have added more slots for next week. Book early.",
    sentAt: "2025-02-04T10:00:00",
    email: true,
    inApp: true,
  },
  {
    id: "ann-2",
    title: "System maintenance",
    body: "Brief maintenance on Sunday 2–4 AM. No action needed.",
    sentAt: "2025-02-01T09:00:00",
    email: false,
    inApp: true,
  },
];

const initialReminders = [
  { id: "rem-1", label: "Before interview", hours: 24, enabled: true },
  { id: "rem-2", label: "Same day", hours: 2, enabled: true },
];

const NotificationManagement = () => {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [reminders, setReminders] = useState(initialReminders);
  const [showCompose, setShowCompose] = useState(false);
  const [compose, setCompose] = useState({
    title: "",
    body: "",
    sendEmail: true,
    sendInApp: true,
  });

  const sendAnnouncement = () => {
    if (!compose.title?.trim()) return;
    setAnnouncements((prev) => [
      {
        id: `ann-${Date.now()}`,
        title: compose.title,
        body: compose.body || "",
        sentAt: new Date().toISOString(),
        email: compose.sendEmail,
        inApp: compose.sendInApp,
      },
      ...prev,
    ]);
    setCompose({ title: "", body: "", sendEmail: true, sendInApp: true });
    setShowCompose(false);
  };

  const toggleReminder = (id) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Notification Management</h2>
          <p className="text-sm text-gray-600">
            Send announcements, email / in-app notifications, and configure reminder scheduler.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowCompose(true)}
          className="self-start md:self-auto inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700"
        >
          Send announcement
        </button>
      </div>

      {/* Compose modal */}
      {showCompose && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            aria-hidden
            onClick={() => setShowCompose(false)}
          />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-xl p-6 z-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">New announcement</h3>
            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={compose.title}
                  onChange={(e) => setCompose((p) => ({ ...p, title: e.target.value }))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2"
                  placeholder="Announcement title"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={compose.body}
                  onChange={(e) => setCompose((p) => ({ ...p, body: e.target.value }))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 min-h-[80px]"
                  placeholder="Message body..."
                />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={compose.sendEmail}
                    onChange={(e) => setCompose((p) => ({ ...p, sendEmail: e.target.checked }))}
                  />
                  <span className="text-sm">Email</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={compose.sendInApp}
                    onChange={(e) => setCompose((p) => ({ ...p, sendInApp: e.target.checked }))}
                  />
                  <span className="text-sm">In-app</span>
                </label>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setShowCompose(false)}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={sendAnnouncement}
                className="flex-1 py-2 rounded-lg bg-green-600 text-white font-medium text-sm hover:bg-green-700"
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}

      {/* Announcements list */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <h3 className="px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-100">
          Recent announcements
        </h3>
        <ul className="divide-y divide-gray-100">
          {announcements.map((a) => (
            <li key={a.id} className="px-4 py-3 text-sm">
              <p className="font-medium text-gray-900">{a.title}</p>
              {a.body && <p className="text-gray-600 mt-1">{a.body}</p>}
              <p className="text-xs text-gray-500 mt-2">
                {formatDate(a.sentAt)} · {a.email && "Email"} {a.email && a.inApp && "·"} {a.inApp && "In-app"}
              </p>
            </li>
          ))}
          {announcements.length === 0 && (
            <li className="px-4 py-4 text-gray-500 text-center">No announcements yet.</li>
          )}
        </ul>
      </div>

      {/* Reminder scheduler */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <h3 className="px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-100">
          Reminder scheduler
        </h3>
        <p className="px-4 py-2 text-xs text-gray-600">
          Send automatic reminders before interviews (e.g. 24h and 2h before).
        </p>
        <ul className="divide-y divide-gray-100">
          {reminders.map((r) => (
            <li key={r.id} className="px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-900">
                {r.label} — {r.hours}h before
              </span>
              <button
                type="button"
                onClick={() => toggleReminder(r.id)}
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  r.enabled ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                }`}
              >
                {r.enabled ? "On" : "Off"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationManagement;
