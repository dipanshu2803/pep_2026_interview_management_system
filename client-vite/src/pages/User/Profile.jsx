import React, { useState } from "react";

const DEFAULT_SKILLS = ["React", "Node.js", "JavaScript", "CSS", "REST APIs"];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeName, setResumeName] = useState(""); // displayed name, e.g. from API
  const [skills, setSkills] = useState(DEFAULT_SKILLS);
  const [skillInput, setSkillInput] = useState("");
  const [profile, setProfile] = useState({
    fullName: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    linkedIn: "linkedin.com/in/priyasharma",
    currentRole: "Software Engineer",
    experience: "4 years",
    preferredLocation: "Bangalore (Hybrid)",
    bio: "Full-stack developer with experience in React and Node.js. Passionate about building scalable web applications.",
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    reminderBeforeInterview: true,
    reminderMinutes: 30,
    timezone: "Asia/Kolkata",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferencesChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // TODO: API call to save profile
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    // TODO: API call to update password
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setResumeName(file.name);
      // TODO: upload to server
    }
  };

  const addSkill = () => {
    const val = skillInput.trim();
    if (val && !skills.includes(val)) {
      setSkills((prev) => [...prev, val]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">My Profile</h2>
        <p className="text-sm text-gray-600">
          Manage your personal information, preferences, and account security.
        </p>
      </div>

      {/* Profile card with avatar and basic info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 h-24" />
        <div className="px-6 pb-6 -mt-12 relative">
          <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-3xl font-semibold text-gray-500 shadow-md">
            {profile.fullName.charAt(0)}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-sm font-medium text-green-700 hover:text-green-800 border border-green-200 rounded-lg px-3 py-1.5"
              >
                Edit profile
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg px-3 py-1.5"
                >
                  Save changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-sm font-medium text-gray-600 hover:text-gray-800 rounded-lg px-3 py-1.5"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Personal information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Personal information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Full name
            </label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleProfileChange}
              disabled={!isEditing}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-700"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              disabled={!isEditing}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-700"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
              disabled={!isEditing}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-700"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              LinkedIn
            </label>
            <input
              type="text"
              name="linkedIn"
              value={profile.linkedIn}
              onChange={handleProfileChange}
              disabled={!isEditing}
              placeholder="Profile URL"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-700"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Current role
            </label>
            <input
              type="text"
              name="currentRole"
              value={profile.currentRole}
              onChange={handleProfileChange}
              disabled={!isEditing}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-700"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Experience
            </label>
            <input
              type="text"
              name="experience"
              value={profile.experience}
              onChange={handleProfileChange}
              disabled={!isEditing}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-700"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Preferred location
            </label>
            <select
              name="preferredLocation"
              value={profile.preferredLocation}
              onChange={handleProfileChange}
              disabled={!isEditing}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-700"
            >
              <option>Bangalore (Hybrid)</option>
              <option>Bangalore (Remote)</option>
              <option>Mumbai (On-site)</option>
              <option>Delhi NCR (Hybrid)</option>
              <option>Remote only</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Short bio
            </label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleProfileChange}
              disabled={!isEditing}
              rows={3}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:bg-gray-50 disabled:text-gray-700 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Resume / CV upload */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Resume / CV
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <label className="cursor-pointer">
            <span className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              Upload CV
            </span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="hidden"
            />
          </label>
          {(resumeName || resumeFile) && (
            <span className="text-sm text-gray-600">
              {resumeName || resumeFile?.name}
            </span>
          )}
          {!resumeName && !resumeFile && (
            <span className="text-xs text-gray-500">PDF or Word, max 5 MB</span>
          )}
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Skills
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Add skills relevant to your profile. These can be shown to interviewers.
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-800 text-sm font-medium"
            >
              {skill}
              {isEditing && (
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-green-600 hover:text-green-800"
                  aria-label={`Remove ${skill}`}
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
        {isEditing && (
          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              placeholder="Add a skill"
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm w-40"
            />
            <button
              type="button"
              onClick={addSkill}
              className="text-sm font-medium text-green-700 hover:text-green-800 border border-green-200 rounded-lg px-3 py-2"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Preferences
        </h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={preferences.emailNotifications}
              onChange={handlePreferencesChange}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-sm text-gray-700">
              Send email notifications for interview updates
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="reminderBeforeInterview"
              checked={preferences.reminderBeforeInterview}
              onChange={handlePreferencesChange}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-sm text-gray-700">
              Remind me before each interview
            </span>
          </label>
          {preferences.reminderBeforeInterview && (
            <div className="pl-6 flex items-center gap-2">
              <span className="text-sm text-gray-600">Remind me</span>
              <select
                name="reminderMinutes"
                value={preferences.reminderMinutes}
                onChange={handlePreferencesChange}
                className="rounded-lg border border-gray-200 px-2 py-1 text-sm"
              >
                <option value={15}>15 minutes before</option>
                <option value={30}>30 minutes before</option>
                <option value={60}>1 hour before</option>
              </select>
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Timezone
            </label>
            <select
              name="timezone"
              value={preferences.timezone}
              onChange={handlePreferencesChange}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="Asia/Kolkata">India (IST)</option>
              <option value="America/New_York">Eastern (EST)</option>
              <option value="Europe/London">London (GMT)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Change password
        </h3>
        <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Current password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              New password
            </label>
            <input
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Confirm new password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2"
          >
            Update password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
