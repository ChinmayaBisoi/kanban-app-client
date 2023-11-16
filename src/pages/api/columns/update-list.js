import { BACKEND_HOST } from "@/constants/env";

export default async function updateList({ title, id }) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ title, id });

    const response = await fetch(`${BACKEND_HOST}/columns/edit`, {
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
