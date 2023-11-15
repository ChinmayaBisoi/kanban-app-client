import { BACKEND_HOST } from "@/constants/env";

export default async function deleteBoardById({ boardId }) {
  try {
    const response = await fetch(`${BACKEND_HOST}/boards/${boardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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
