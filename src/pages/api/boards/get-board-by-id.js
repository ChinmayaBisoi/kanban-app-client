import { BACKEND_HOST } from "@/constants/env";

export default async function getBoardById({ boardId }) {
  try {
    const response = await fetch(`${BACKEND_HOST}/boards/id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: boardId,
      }),
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
