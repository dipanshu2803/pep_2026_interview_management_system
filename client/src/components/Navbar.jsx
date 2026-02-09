import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isUser = location.pathname.startsWith("/user");
  const [showNotifications, setShowNotifications] = useState(false);

  const isAdmin = location.pathname.startsWith("/admin");
  const handleLogout = () => {
    logout();
    navigate(isAdmin ? "/admin/login" : "/login");
  };

  const unreadCount = 2; // TODO: from context/API

  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <span className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold">
          HT
        </span>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">HireTrack</h1>
          <p className="text-xs text-gray-500">
            Streamline scheduling, tracking, and reporting
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isUser && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications((v) => !v)}
              className="relative p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Notifications"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-green-600 text-white text-[10px] font-medium flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  aria-hidden
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 mt-1 w-72 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
                  <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">Notifications</span>
                    <Link
                      to="/user/notifications"
                      onClick={() => setShowNotifications(false)}
                      className="text-xs font-medium text-green-600 hover:text-green-700"
                    >
                      View all
                    </Link>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <p className="px-3 py-4 text-xs text-gray-500 text-center">
                      <Link
                        to="/user/notifications"
                        onClick={() => setShowNotifications(false)}
                        className="text-green-600 hover:text-green-700"
                      >
                        Open notification settings and history
                      </Link>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        <button
          type="button"
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          Help
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-1.5 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
