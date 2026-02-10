import React, { useState, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  MOCK_COMPANIES,
  MOCK_INTERVIEWERS,
  ROLES,
  getAvailableSlots,
} from "../../data/mockBooking";

const ScheduleInterview = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    companyId: "",
    interviewerId: "",
    role: "",
    date: null,
    time: "",
    notes: "",
  });
  const [confirmed, setConfirmed] = useState(false);

  const interviewersForCompany = useMemo(() => {
    if (!form.companyId) return [];
    return MOCK_INTERVIEWERS.filter((i) => i.companyId === form.companyId);
  }, [form.companyId]);

  const availableSlots = useMemo(() => {
    if (!form.date) return [];
    return getAvailableSlots(form.date);
  }, [form.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "companyId") setForm((prev) => ({ ...prev, interviewerId: "" }));
  };

  const handleDateChange = (value) => {
    setForm((prev) => ({ ...prev, date: value, time: "" }));
  };

  const canProceed = () => {
    if (step === 1) return form.companyId && form.interviewerId && form.role;
    if (step === 2) return form.date;
    if (step === 3) return form.time;
    return false;
  };

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1);
    else handleConfirmBooking();
  };

  const handleConfirmBooking = () => {
    setConfirmed(true);
  };

  const companyName = MOCK_COMPANIES.find((c) => c.id === form.companyId)?.name || "";
  const interviewerName = MOCK_INTERVIEWERS.find((i) => i.id === form.interviewerId)?.name || "";
  const dateStr = form.date
    ? (typeof form.date === "object" && form.date instanceof Date
        ? form.date
        : new Date(form.date)
      ).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })
    : "";

  if (confirmed) {
    return (
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center max-w-md mx-auto">
          <div className="text-5xl mb-3">✓</div>
          <h3 className="text-xl font-semibold text-green-800">Booking confirmed</h3>
          <p className="text-sm text-green-700 mt-2">
            Your interview has been scheduled.
          </p>
          <div className="mt-6 text-left bg-white/60 rounded-lg p-4 text-sm text-gray-800">
            <p><strong>Company:</strong> {companyName}</p>
            <p><strong>Interviewer:</strong> {interviewerName}</p>
            <p><strong>Role:</strong> {form.role}</p>
            <p><strong>Date:</strong> {dateStr}</p>
            <p><strong>Time:</strong> {form.time}</p>
          </div>
          <p className="text-xs text-green-700 mt-4">
            A calendar invite and reminder will be sent to your email.
          </p>
          <button
            type="button"
            onClick={() => {
              setConfirmed(false);
              setStep(1);
              setForm({
                companyId: "",
                interviewerId: "",
                role: "",
                date: null,
                time: "",
                notes: "",
              });
            }}
            className="mt-6 text-sm font-medium text-green-700 hover:text-green-800 border border-green-300 rounded-lg px-4 py-2"
          >
            Book another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Book an interview</h2>
        <p className="text-sm text-gray-600">
          Select company, interviewer, date & time. Only available slots are shown.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full ${
              step >= s ? "bg-green-600" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-2xl">
        {/* Step 1: Company, Interviewer, Role */}
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-900">Select company & interviewer</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company <span className="text-red-500">*</span>
              </label>
              <select
                name="companyId"
                value={form.companyId}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select company</option>
                {MOCK_COMPANIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interviewer <span className="text-red-500">*</span>
              </label>
              <select
                name="interviewerId"
                value={form.interviewerId}
                onChange={handleChange}
                required
                disabled={!form.companyId}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50"
              >
                <option value="">Select interviewer</option>
                {interviewersForCompany.map((i) => (
                  <option key={i.id} value={i.id}>{i.name} · {i.role}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role you’re applying for <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select role</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Step 2: Calendar */}
        {step === 2 && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-900">Choose date</h3>
            <p className="text-sm text-gray-600">Select a date. Available time slots will show in the next step.</p>
            <div className="flex justify-center">
              <Calendar
                onChange={handleDateChange}
                value={form.date || new Date()}
                minDate={new Date()}
                className="rounded-lg border-0 shadow-none w-full"
              />
            </div>
            {form.date && (
              <p className="text-sm text-gray-600">
                Selected: <strong>{dateStr}</strong>
              </p>
            )}
          </div>
        )}

        {/* Step 3: Time slots + confirm */}
        {step === 3 && (
          <div className="space-y-5">
            <h3 className="text-lg font-semibold text-gray-900">Choose time</h3>
            <p className="text-sm text-gray-600">
              Only available slots for {dateStr} are shown.
            </p>
            {availableSlots.length === 0 ? (
              <p className="text-sm text-amber-700 bg-amber-50 rounded-lg p-3">
                No slots available on this date. Please pick another date.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, time: slot }))}
                    className={`py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                      form.time === slot
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white text-gray-700 border-gray-200 hover:border-green-400 hover:bg-green-50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={2}
                placeholder="Any special requests"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
              />
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
              <p><strong>Summary:</strong> {companyName} · {interviewerName} · {form.role}</p>
              <p>{dateStr} at {form.time || "—"}</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            {step === 1 ? "Back" : "← Previous"}
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed() || (step === 3 && availableSlots.length === 0)}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            {step === 3 ? "Confirm booking" : "Next →"}
          </button>
        </div>
      </div>

      {/* Calendar overrides for Tailwind-friendly look */}
      <style>{`
        .react-calendar {
          width: 100%;
          border: none;
          font-family: inherit;
        }
        .react-calendar__tile:disabled {
          opacity: 0.4;
        }
        .react-calendar__tile--now {
          background: #dcfce7;
        }
        .react-calendar__tile--active {
          background: #16a34a !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default ScheduleInterview;
