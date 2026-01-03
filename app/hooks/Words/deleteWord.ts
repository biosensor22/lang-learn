import axios from "axios";

export async function deleteWord(word: string) {
  if (!word) return { success: false, message: "Word doesn't choosed" };

  try {
    const response = await axios.delete("/api/words/delete", {
      data: { word },
    });
    return response.data;
  } catch (err) {
    return { success: false, message: err };
  }
}
