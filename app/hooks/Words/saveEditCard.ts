import axios from "axios";

import type { Words } from "@/app/components/ToLearn/WordEdit";

export async function saveEditCard(data: Words) {
  try {
    const response = await axios.patch("/api/words/edit", data);
    return response.data;
  } catch (err) {
    console.log("Inrernal server error", err);
  }
}
