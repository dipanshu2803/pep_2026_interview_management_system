import axiosInstance from "../utils/axiosInstance";

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
