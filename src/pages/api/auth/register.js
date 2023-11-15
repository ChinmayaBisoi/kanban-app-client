import { BACKEND_HOST } from "@/constants/env";

export default async function register({ email, password }) {
  try {
    const raw = JSON.stringify({ email, password });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
      credentials: "include",
      mode: "cors",
    };
 
    const response = await fetch(
      `${BACKEND_HOST}/auth/register`,
      requestOptions
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
  return {};
}
