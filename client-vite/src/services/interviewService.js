import axiosInstance from "../utils/axiosInstance";

/**
 * Server status values: scheduled, completed, pending, cancelled, selected, rejected
 * Client display: Scheduled, Completed, Pending feedback, Cancelled, etc.
 */
export const statusToDisplay = {
  scheduled: "Scheduled",
  completed: "Completed",
  pending: "Pending feedback",
  pending_approval: "Pending approval",
  cancelled: "Cancelled",
  selected: "Selected",
  rejected: "Rejected",
};
const displayToStatus = {};
Object.entries(statusToDisplay).forEach(([k, v]) => (displayToStatus[v] = k));

function formatDate(d) {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toISOString().slice(0, 10);
}

/** Get interviews for a user (candidate). Returns list mapped to user-facing shape. */
export const getUserInterviews = async (userId, status) => {
  const params = status ? { status } : {};
  const { data } = await axiosInstance.get(`/interviews/user/${userId}`, { params });
  const list = Array.isArray(data) ? data : [];
  return list.map((inv) => ({
    id: inv._id || inv.id,
    date: formatDate(inv.date),
    time: inv.time,
    duration: inv.duration ?? 60,
    status: inv.status,
    interviewer: inv.interviewer,
    mode: inv.mode,
    meetingLink: inv.meetingLink,
    platform: inv.platform,
    role: inv.role,
    company: inv.company,
    outcome: inv.outcome,
    notes: inv.notes,
    feedback: inv.feedback,
    feedbackVisibleToCandidate: inv.feedbackVisibleToCandidate,
  }));
};

/** Get single interview by id. */
export const getInterviewById = async (id) => {
  const { data } = await axiosInstance.get(`/interviews/${id}`);
  return data;
};

/**
 * Create interview. Body: userId (candidate), role, company, date (ISO string), time,
 * mode, status (server enum), interviewer, interviewerEmail, etc.
 */
export const createInterview = async (body) => {
  const payload = {
    userId: body.userId,
    role: body.role,
    company: body.company,
    date: body.date,
    time: body.time,
    duration: body.duration ?? 60,
    mode: body.mode || "Online",
    status: displayToStatus[body.status] || body.status || "scheduled",
    interviewer: body.interviewer || "",
    interviewerEmail: body.interviewerEmail || "",
    meetingLink: body.meetingLink,
    platform: body.platform,
    address: body.address,
  };
  const { data } = await axiosInstance.post("/interviews", payload);
  return data;
};

/** Update interview. */
export const updateInterview = async (id, body) => {
  const payload = { ...body };
  if (payload.status && displayToStatus[payload.status] !== undefined) {
    payload.status = displayToStatus[payload.status];
  }
  const { data } = await axiosInstance.put(`/interviews/${id}`, payload);
  return data;
};

export { displayToStatus, formatDate };
