export const BACKEND_HOST = process.env.NEXT_PUBLIC_IS_DEV
  ? "http://localhost:8080"
  : process.env.NEXT_PUBLIC_DEV_BACKEND_HOST;
