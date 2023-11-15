import { BACKEND_HOST } from "@/constants/env";

export default async function getAllBoards() {
  try {
    const response = await fetch(`${BACKEND_HOST}/boards/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return {};
}
