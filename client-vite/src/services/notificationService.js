import axiosInstance from "../utils/axiosInstance";

export const getUserNotifications = async (userId) => {
  const { data } = await axiosInstance.get(`/notifications/user/${userId}`);
  return data;
};

export const markNotificationRead = async (id) => {
  const { data } = await axiosInstance.patch(`/notifications/${id}/read`);
  return data;
};
