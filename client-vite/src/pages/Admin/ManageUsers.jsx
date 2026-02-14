import React, { useState, useEffect } from "react";
import { getAdminUsers, blockAdminUser, deleteAdminUser } from "../../services/adminService";
import { getStoredUser } from "../../services/authService";
import { mockUsers } from "../../data/mockAdminUsers";

const ROLES = [
  { value: "", label: "All roles" },
  { value: "candidate", label: "Candidate" },
  { value: "interviewer", label: "Interviewer" },
  { value: "admin", label: "Admin" },
];

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const currentUser = getStoredUser();

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAdminUsers(roleFilter || undefined);
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setUsers(mockUsers);
      if (err.response?.status !== 401) setError("Could not load users. Showing demo data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [roleFilter]);

  const handleBlock = async (user) => {
    if (user._id === currentUser?.id) return;
    const blocked = !user.isBlocked;
    try {
      await blockAdminUser(user._id, blocked);
      setUsers((prev) => prev.map((u) => (u._id === user._id ? { ...u, isBlocked: blocked } : u)));
    } catch (err) {
      setUsers((prev) => prev.map((u) => (u._id === user._id ? { ...u, isBlocked: blocked } : u)));
    }
  };

  const handleDelete = async (id) => {
    if (id === currentUser?.id) return;
    try {
      await deleteAdminUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setDeleteId(null);
    } catch (err) {
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setDeleteId(null);
    }
  };

  const displayedUsers = roleFilter
    ? users.filter((u) => u.role === roleFilter)
    : users;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">User Management</h2>
          <p className="text-sm text-gray-600">
            View all users, filter by role, block/unblock, or delete.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Filter:</label>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm bg-white"
          >
            {ROLES.map((r) => (
              <option key={r.value || "all"} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p className="text-sm text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading users…</div>
        ) : displayedUsers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Role</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {displayedUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {user.fullName}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{user.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-amber-50 text-amber-700"
                            : user.role === "interviewer"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {user.isBlocked ? (
                        <span className="text-red-600 font-medium">Blocked</span>
                      ) : (
                        <span className="text-green-600 font-medium">Active</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {user._id !== currentUser?.id && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleBlock(user)}
                              className={`text-xs font-medium rounded-lg px-2.5 py-1.5 ${
                                user.isBlocked
                                  ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                                  : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                              }`}
                            >
                              {user.isBlocked ? "Unblock" : "Block"}
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteId(user._id)}
                              className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg px-2.5 py-1.5 hover:bg-red-100"
                            >
                              Delete
                            </button>
                          </>
                        )}
                        {user._id === currentUser?.id && (
                          <span className="text-xs text-gray-400">(you)</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {deleteId && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            aria-hidden
            onClick={() => setDeleteId(null)}
          />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-xl shadow-xl p-6 z-50">
            <h3 className="text-lg font-semibold text-gray-900">Delete user?</h3>
            <p className="text-sm text-gray-500 mt-1">
              This cannot be undone. The user will lose access immediately.
            </p>
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2 rounded-lg bg-red-600 text-white font-medium text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageUsers;
