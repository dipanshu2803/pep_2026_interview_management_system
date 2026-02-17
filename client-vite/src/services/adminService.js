import axiosInstance from "../utils/axiosInstance";

/** Admin: create a notification for a specific user. */
export const createNotificationForUser = async (userId, { type, title, message, link }) => {
  const { data } = await axiosInstance.post("/admin/notifications", {
    userId,
    type,
    title,
    message: message || "",
    link: link || undefined,
  });
  return data;
};

export const getAdminUsers = async (role) => {
  const params = role ? { role } : {};
  const { data } = await axiosInstance.get("/admin/users", { params });
  return data;
};

export const getAdminInterviews = async () => {
  const { data } = await axiosInstance.get("/admin/interviews");
  return data;
};

export const blockAdminUser = async (userId, blocked) => {
  const { data } = await axiosInstance.patch(`/admin/users/${userId}/block`, {
    blocked,
  });
  return data;
};

export const deleteAdminUser = async (userId) => {
  const { data } = await axiosInstance.delete(`/admin/users/${userId}`);
  return data;
};
