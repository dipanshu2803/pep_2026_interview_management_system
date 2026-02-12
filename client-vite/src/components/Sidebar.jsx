import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const linkBaseClasses =
  "block px-3 py-2 rounded-md text-sm font-medium transition-colors";

const linkActive = ({ isActive }) =>
  `${linkBaseClasses} ${
    isActive ? "bg-green-100 text-green-700" : "text-gray-700 hover:bg-gray-100"
  }`;

const Sidebar = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  const isUser = pathname.startsWith("/user");

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 h-full flex flex-col">
      <div className="px-4 py-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {isAdmin ? "Admin" : isUser ? "User" : "Navigation"}
        </p>
      </div>

      <nav className="flex-1 px-2 space-y-1 overflow-y-auto pb-4">
        {isUser && (
          <>
            <NavLink to="/user/dashboard" className={linkActive}>
              Dashboard
            </NavLink>
            <NavLink to="/user/schedule" className={linkActive}>
              Schedule Interview
            </NavLink>
            <NavLink to="/user/interviews" className={linkActive}>
              My Interviews
            </NavLink>
            <NavLink to="/user/feedback" className={linkActive}>
              Feedback
            </NavLink>
            <NavLink to="/user/notifications" className={linkActive}>
              Notifications
            </NavLink>
            <NavLink to="/user/profile" className={linkActive}>
              Profile
            </NavLink>
          </>
        )}

        {isAdmin && (
          <>
            <NavLink to="/admin/dashboard" className={linkActive}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/interviews" className={linkActive}>
              Interview scheduling
            </NavLink>
            <NavLink to="/admin/interviewers" className={linkActive}>
              Interviewers
            </NavLink>
            <NavLink to="/admin/users" className={linkActive}>
              Users
            </NavLink>
            <NavLink to="/admin/feedback" className={linkActive}>
              Feedback & results
            </NavLink>
            <NavLink to="/admin/notifications" className={linkActive}>
              Notifications
            </NavLink>
            <NavLink to="/admin/reports" className={linkActive}>
              Reports
            </NavLink>
            <NavLink to="/admin/settings" className={linkActive}>
              Settings
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
