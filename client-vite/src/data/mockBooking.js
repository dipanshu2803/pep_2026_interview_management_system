// Mock data for Interview Booking: companies, interviewers, and slot availability

export const MOCK_COMPANIES = [
  { id: "techcorp", name: "Tech Corp" },
  { id: "datasolutions", name: "Data Solutions" },
  { id: "startupxyz", name: "StartupXYZ" },
  { id: "webagency", name: "Web Agency" },
  { id: "cloudtech", name: "CloudTech" },
];

export const MOCK_INTERVIEWERS = [
  { id: "i1", name: "Rahul Verma", companyId: "techcorp", role: "Engineering Lead" },
  { id: "i2", name: "Anita Desai", companyId: "datasolutions", role: "Backend Lead" },
  { id: "i3", name: "Vikram Singh", companyId: "startupxyz", role: "CTO" },
  { id: "i4", name: "Sneha Nair", companyId: "webagency", role: "Frontend Lead" },
  { id: "i5", name: "Karan Mehta", companyId: "cloudtech", role: "DevOps Lead" },
  { id: "i6", name: "Priya Reddy", companyId: "techcorp", role: "Senior Engineer" },
];

export const ROLES = [
  "Frontend Developer",
  "Backend Engineer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Analyst",
  "Product Manager",
];

// All possible time slots in a day (for availability)
export const ALL_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM",
];

// For a given date string (YYYY-MM-DD), return which slots are "taken" (mock).
// In real app this would come from API. Here we fake it: same date always has same taken slots.
const takenSlotsByDate = {};
const getTakenSlotsForDate = (dateStr) => {
  if (!takenSlotsByDate[dateStr]) {
    const hash = dateStr.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const takenCount = (hash % 5) + 2;
    const indices = new Set();
    while (indices.size < takenCount) {
      indices.add((hash + indices.size * 7) % ALL_SLOTS.length);
    }
    takenSlotsByDate[dateStr] = indices.size ? ALL_SLOTS.filter((_, i) => indices.has(i)) : [];
  }
  return takenSlotsByDate[dateStr];
};

export const getAvailableSlots = (date) => {
  if (!date) return [];
  const dateStr = typeof date === "string" ? date : date.toISOString().split("T")[0];
  const taken = getTakenSlotsForDate(dateStr);
  return ALL_SLOTS.filter((slot) => !taken.includes(slot));
};
