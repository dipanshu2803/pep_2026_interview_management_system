/**
 * Generate a Google Meet-style link (format: https://meet.google.com/xxx-xxxx-xxx).
 * The code is 10 lowercase letters in 3-4-3 segments. When participants open the link,
 * they can start or join a meeting with that code on Google Meet.
 */
function randomSegment(length) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let s = "";
  for (let i = 0; i < length; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return s;
}

function generateGoogleMeetLink() {
  const code = `${randomSegment(3)}-${randomSegment(4)}-${randomSegment(3)}`;
  return `https://meet.google.com/${code}`;
}

module.exports = { generateGoogleMeetLink };
