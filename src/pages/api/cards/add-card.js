import { BACKEND_HOST } from "@/constants/env";

export default async function addCard({
  columnId,
  title,
  description,
  dueDate,
}) {
  try {
    const raw = JSON.stringify({
      columnId,
      title,
      description,
      dueDate,
    });

    const response = await fetch(`${BACKEND_HOST}/cards/add`, {
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
