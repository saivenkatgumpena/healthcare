import axios from "axios";

/** In dev, use Vite proxy (same origin) unless VITE_BACKEND_URL overrides. */
export const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL ||
  (import.meta.env.DEV ? "" : "http://localhost:5000");

/** Shared client: same origin config for login, cookies, and all API calls */
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
