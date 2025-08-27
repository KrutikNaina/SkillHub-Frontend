// src/axios.js (create this once)
import axios from "axios";

const instance = axios.create({
  baseURL: "https://skill-hub-backend-4b6u.vercel.app", // 👈 just change here
  withCredentials: true, // for cookies if using auth
});

export default instance;
