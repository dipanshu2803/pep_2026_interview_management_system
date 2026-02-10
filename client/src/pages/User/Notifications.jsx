import React, { useState } from "react";
import { Link } from "react-router-dom";

const mockNotifications = [
  {
    id: 1,
    type: "upcoming",
    title: "Interview reminder",
    message: "Frontend Developer at Tech Corp – tomorrow at 3:00 PM (Online).",
    time: "2025-02-05T10:00:00",
    read: false,
    link: "/user/interviews/1",
  },
  {
    id: 2,
    type: "rescheduled",
    title: "Interview rescheduled",
    message: "Backend Engineer at Data Solutions has been moved to Feb 8, 11:00 AM.",
    time: "2025-02-04T14:30:00",
    read: false,
    link: "/user/interviews/2",
  },
  {
    id: 3,
    type: "cancelled",
    title: "Interview cancelled",
    message: "DevOps Engineer at CloudTech was cancelled by the company.",
    time: "2025-01-15T09:00:00",
    read: true,
    link: "/user/interviews/5",
  },
  {
    id: 4,
    type: "upcoming",
    title: "Interview reminder",
    message: "Backend Engineer at Data Solutions – Feb 8 at 11:00 AM (On-site).",
    time: "2025-02-06T08:00:00",
    read: true,
    link: "/user/interviews/2",
  },
];

const typeStyles = {
  upcoming: "bg-blue-50 text-blue-700",
  rescheduled: "bg-amber-50 text-amber-700",
  cancelled: "bg-red-50 text-red-700",
};

const Notifications = () => {
  const [prefs, setPrefs] = useState({
    emailUpcoming: true,
    emailRescheduled: true,
    emailCancelled: true,
    inAppUpcoming: true,
    inAppRescheduled: true,
    inAppCancelled: true,
  });

  const handlePrefChange = (e) => {
    const { name, checked } = e.target;
    setPrefs((prev) => ({ ...prev, [name]: checked }));
  };

  const formatTime = (t) => {
    const d = new Date(t);
    const now = new Date();
    const diff = now - d;
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return d.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Notifications</h2>
        <p className="text-sm text-gray-600">
          Manage how you receive reminders and alerts for upcoming, rescheduled, and cancelled interviews.
        </p>
      </div>

      {/* Notification preferences */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Notification preferences
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Choose whether to get email and/or in-app notifications for each type of event.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-medium text-gray-700">Event</th>
                <th className="text-left py-2 font-medium text-gray-700">Email</th>
                <th className="text-left py-2 font-medium text-gray-700">In-app</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 text-gray-900">Upcoming interview reminders</td>
                <td className="py-3">
                  <input
                    type="checkbox"
                    name="emailUpcoming"
                    checked={prefs.emailUpcoming}
                    onChange={handlePrefChange}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                </td>
                <td className="py-3">
                  <input
                    type="checkbox"
                    name="inAppUpcoming"
                    checked={prefs.inAppUpcoming}
                    onChange={handlePrefChange}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-3 text-gray-900">Interview rescheduled</td>
                <td className="py-3">
                  <input
                    type="checkbox"
                    name="emailRescheduled"
                    checked={prefs.emailRescheduled}
                    onChange={handlePrefChange}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                </td>
                <td className="py-3">
                  <input
                    type="checkbox"
                    name="inAppRescheduled"
                    checked={prefs.inAppRescheduled}
                    onChange={handlePrefChange}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-3 text-gray-900">Interview cancelled</td>
                <td className="py-3">
                  <input
                    type="checkbox"
                    name="emailCancelled"
                    checked={prefs.emailCancelled}
                    onChange={handlePrefChange}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                </td>
                <td className="py-3">
                  <input
                    type="checkbox"
                    name="inAppCancelled"
                    checked={prefs.inAppCancelled}
                    onChange={handlePrefChange}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* In-app notification list */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900">Recent notifications</h3>
        </div>
        <ul className="divide-y divide-gray-100">
          {mockNotifications.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-gray-500">
              No notifications yet.
            </li>
          ) : (
            mockNotifications.map((n) => (
              <li
                key={n.id}
                className={`px-4 py-3 ${!n.read ? "bg-green-50/50" : ""}`}
              >
                <Link to={n.link} className="block">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeStyles[n.type] || "bg-gray-100 text-gray-700"}`}
                    >
                      {n.type === "upcoming"
                        ? "Reminder"
                        : n.type === "rescheduled"
                          ? "Rescheduled"
                          : "Cancelled"}
                    </span>
                    <span className="text-xs text-gray-500">{formatTime(n.time)}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{n.title}</p>
                  <p className="text-sm text-gray-600">{n.message}</p>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
