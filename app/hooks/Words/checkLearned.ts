import axios from "axios";

export async function moveWordToLearned(word: string) {
  if (!word) return { success: false, message: "word doesn't choosed" };

  try {
    const response = await axios.patch("/api/words/to-learned", { word });
    return response.data;
  } catch (err) {
    return { success: false, message: err };
  }
}
