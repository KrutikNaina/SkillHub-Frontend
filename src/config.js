// config.js (create this file in frontend/src)
export const API_BASE_URL = 
  process.env.NODE_ENV === "production"
    ? "https://skillhub.krutiknaina.com/"
    : "http://localhost:5000";
