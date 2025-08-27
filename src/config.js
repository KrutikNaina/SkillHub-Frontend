// config.js (create this file in frontend/src)
export const API_BASE_URL = 
  process.env.NODE_ENV === "production"
    ? "https://skill-hub-backend-4b6u.vercel.app"
    : "http://localhost:5000";
