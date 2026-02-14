import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, setAuth } from "../../services/authService";

const Login = () => {
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
      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    if (role === "admin") {
      setAuth("demo-admin-token", {
        id: "demo-admin",
        email: "admin@demo.com",
        fullName: "Demo Admin",
        role: "admin",
      });
      navigate("/admin/dashboard");
    } else {
      setAuth("demo-user-token", {
        id: "demo-user",
        email: "user@demo.com",
        fullName: "Demo User",
        role: "candidate",
      });
      navigate("/user/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            PEP 2026 Interview Management
          </h1>
          <p className="text-sm text-gray-500">Sign in with email & password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-medium text-green-600 hover:text-green-700"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="font-medium text-green-600 hover:text-green-700">
            Sign up
          </Link>
          {" · "}
          <Link to="/admin/login" className="font-medium text-amber-600 hover:text-amber-700">
            Admin login
          </Link>
        </p>

        <div className="border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500 text-center mb-2">Quick demo (no API)</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin("candidate")}
              className="flex-1 py-2 rounded-lg bg-green-50 text-green-700 font-medium text-sm hover:bg-green-100"
            >
              Continue as Candidate
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50"
            >
              Continue as Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
