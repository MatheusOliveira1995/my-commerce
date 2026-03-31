"use client";
import { ReactElement } from "react";
import { ErrorComponent } from "@/core/components";

interface ErrorPageProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

const ErrorPage = ({ unstable_retry }: ErrorPageProps): ReactElement => {
  return <ErrorComponent handleRetry={unstable_retry} />;
};

export default ErrorPage;
