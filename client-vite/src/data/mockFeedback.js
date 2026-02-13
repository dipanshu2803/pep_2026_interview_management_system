// Admin feedback list – interviews with optional feedback and result
export const mockFeedbackList = [
  {
    id: "#INT-1024",
    candidateName: "Aarav Sharma",
    interviewerName: "Rahul Verma",
    date: "2025-02-06",
    time: "2:00 PM",
    result: "Pending",
    feedbackText: "",
    visibleToCandidate: false,
  },
  {
    id: "#INT-1023",
    candidateName: "Neha Patel",
    interviewerName: "Anita Desai",
    date: "2025-02-06",
    time: "4:30 PM",
    result: "Selected",
    feedbackText: "Strong analytical skills and clear communication.",
    visibleToCandidate: true,
  },
  {
    id: "#INT-1022",
    candidateName: "Rohan Gupta",
    interviewerName: "Vikram Singh",
    date: "2025-02-05",
    time: "11:00 AM",
    result: "Rejected",
    feedbackText: "Technical depth good but culture fit concerns.",
    visibleToCandidate: true,
  },
];

export const RESULT_OPTIONS = ["Pending", "Selected", "Rejected"];
