import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Real-time scheduling",
    description: "Pick your slot and get confirmed instantly. No back-and-forth emails.",
    icon: "📅",
  },
  {
    title: "Smart reminders",
    description: "Email and in-app reminders before every interview so you never miss one.",
    icon: "🔔",
  },
  {
    title: "Calendar sync",
    description: "Sync with your calendar and get alerts when an interview is rescheduled or cancelled.",
    icon: "📆",
  },
  {
    title: "One place for everything",
    description: "View past interviews, status, feedback, and manage your profile in one dashboard.",
    icon: "✨",
  },
];

const stats = [
  { value: "500+", label: "Interviews scheduled" },
  { value: "98%", label: "On-time rate" },
  { value: "50+", label: "Companies onboarded" },
];

const testimonials = [
  {
    quote: "Finally, no more missed interviews. The reminders and calendar link are a game-changer.",
    name: "Priya S.",
    role: "Software Engineer",
  },
  {
    quote: "Scheduling used to take days. Now I get a slot in minutes. So smooth.",
    name: "Rahul V.",
    role: "Product Manager",
  },
  {
    quote: "Clean dashboard, clear status for each round. Exactly what candidates need.",
    name: "Neha P.",
    role: "Data Analyst",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
              HT
            </span>
            <span className="font-semibold text-slate-900">HireTrack</span>
          </Link>
          <nav className="flex items-center gap-4">
            <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 hidden sm:inline">
              Features
            </a>
            <Link
              to="/login"
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Login
            </Link>
            <Link
              to="/login"
              className="text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg shadow-sm"
            >
              Book Interview
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-slate-50" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight max-w-3xl mx-auto">
            Schedule interviews without the chaos
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            PEP 2026 Interview Management lets you book slots, get reminders, and track every round—all in one place.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white bg-emerald-600 hover:bg-emerald-700 shadow-md"
            >
              Book Interview
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center">
            Everything you need to stay on top of interviews
          </h2>
          <p className="mt-2 text-slate-600 text-center max-w-xl mx-auto">
            Real-time scheduling, reminders, and calendar sync—so you never miss a round.
          </p>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors"
              >
                <span className="text-2xl" aria-hidden>{f.icon}</span>
                <h3 className="mt-3 font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 bg-emerald-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-bold text-white">{s.value}</p>
                <p className="mt-1 text-sm text-emerald-100">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center">
            What candidates say
          </h2>
          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm"
              >
                <p className="text-slate-700 italic">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4">
                  <p className="font-medium text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Ready to simplify your interview schedule?
          </h2>
          <p className="mt-2 text-slate-600">
            Book your next interview or log in to manage your dashboard.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white bg-emerald-600 hover:bg-emerald-700"
            >
              Book Interview
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium text-slate-700 border border-slate-200 hover:bg-slate-50"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-slate-500">
            PEP 2026 Interview Management · HireTrack
          </p>
          <Link to="/login" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
            Login
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
