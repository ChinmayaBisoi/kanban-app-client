import { BACKEND_HOST } from "@/constants/env";

export default async function addList({ title, boardId }) {
  try {
    const raw = JSON.stringify({
      title,
      boardId,
    });

    const response = await fetch(`${BACKEND_HOST}/columns/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
      credentials: "include",
      mode: "cors",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return {};
}
