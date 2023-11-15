import { BACKEND_HOST } from "@/constants/env";

export default async function addBoard({
  title,
  description,
  isPinned = false,
  labels = [],
}) {
  try {
    const raw = JSON.stringify({
      title,
      description,
      isPinned,
      labels,
    });

    const response = await fetch(`${BACKEND_HOST}/boards/add`, {
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
