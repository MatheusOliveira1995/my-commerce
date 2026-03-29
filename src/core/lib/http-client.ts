import axios, { AxiosError } from "axios";
import { HttpError } from "@/core/lib/http-error";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    Accept: "application/json",
  },
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status ?? 500;
    const message =
      error.response?.statusText ?? error.message ?? "Unexpected error";
    return Promise.reject(new HttpError(status, message));
  },
);

export default httpClient;
