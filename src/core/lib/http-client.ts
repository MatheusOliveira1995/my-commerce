import axios, { AxiosError } from "axios";
import { HttpError } from "@/core/lib/http-error";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
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
