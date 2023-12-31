import { BACKEND_HOST } from "@/constants/env";

export default async function updateBoard({ title, description, id }) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ title, description, id });

    const response = await fetch(`${BACKEND_HOST}/boards/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      headers: myHeaders,
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
