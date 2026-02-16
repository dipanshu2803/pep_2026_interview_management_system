import axiosInstance from "../utils/axiosInstance";

export const TOKEN_KEY = "token";
const USER_KEY = "user";

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);
export const getStoredUser = () => {
  const u = localStorage.getItem(USER_KEY);
  return u ? JSON.parse(u) : null;
};

export const setAuth = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const login = async (email, password) => {
  const { data } = await axiosInstance.post("/auth/login", { email, password });
  setAuth(data.token, data.user);
  return data;
};

export const signup = async (fullName, email, password, role = "candidate") => {
  const { data } = await axiosInstance.post("/auth/signup", {
    fullName,
    email,
    password,
    role,
  });
  setAuth(data.token, data.user);
  return data;
};

export const forgotPassword = async (email) => {
  const { data } = await axiosInstance.post("/auth/forgot-password", { email });
  return data;
};

export const resetPassword = async (token, newPassword) => {
  const { data } = await axiosInstance.post("/auth/reset-password", {
    token,
    newPassword,
  });
  setAuth(data.token, data.user);
  return data;
};

export const logout = () => {
  clearAuth();
};

export const getMe = async () => {
  const { data } = await axiosInstance.get("/auth/me");
  return data;
};
