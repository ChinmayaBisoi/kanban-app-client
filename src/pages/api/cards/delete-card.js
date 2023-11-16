import { BACKEND_HOST } from "@/constants/env";

export default async function deleteCard({ cardId }) {
  try {
    const response = await fetch(`${BACKEND_HOST}/cards/${cardId}`, {
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
