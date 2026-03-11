import axios from "axios";

export type ListTypes = "to-learn" | "learned" | "vocabulary";

export async function getListOfWords(type: ListTypes) {
  try {
    const result = await axios.get("/api/words/list", { params: { type } });
    return result.data;
  } catch (err) {
    return {
      success: false,
      message: "Error occured while getting words",
      err,
    };
  }
}
