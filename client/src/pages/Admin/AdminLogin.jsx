import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, setAuth } from "../../services/authService";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await login(form.email, form.password);
      if (data.user.role !== "admin") {
        setError("Admin access only. Use the candidate login for regular accounts.");
        return;
      }
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAdmin = () => {
    setAuth("demo-admin-token", {
      id: "demo-admin",
      email: "admin@demo.com",
      fullName: "Demo Admin",
      role: "admin",
    });
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center space-y-1">
          <div className="inline-flex h-12 w-12 rounded-xl bg-amber-500 text-white items-center justify-center text-xl font-bold mb-2">
            A
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Admin Login
          </h1>
          <p className="text-sm text-gray-500">
            Separate admin authentication. Role-based access only.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admin email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="admin@example.com"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Admin sign in"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Not an admin?{" "}
          <Link to="/login" className="font-medium text-green-600 hover:text-green-700">
            Candidate / Interviewer login
          </Link>
        </p>

        <div className="border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500 text-center mb-2">No admin account yet?</p>
          <button
            type="button"
            onClick={handleDemoAdmin}
            className="w-full py-2 rounded-lg border border-amber-300 text-amber-700 font-medium text-sm hover:bg-amber-50"
          >
            Continue as Admin (demo)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
