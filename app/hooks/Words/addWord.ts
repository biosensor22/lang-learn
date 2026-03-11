import axios from "axios";

export async function AddNewWord(word: string) {
  if (word.length === 0)
    return { message: "Word should be minimum 1 character" };

  try {
    const response = await axios.post("/api/words", { word });
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const serverData = err.response?.data as { error?: string };

      if (serverData?.error) {
        return { success: false, message: serverData.error };
      }

      return { success: false, message: err.message };
    }

    return { success: false, message: "Unknown error" };
  }
}
