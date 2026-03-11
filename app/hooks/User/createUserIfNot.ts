import axios from "axios";

type User = {
  id?: number;
  name?: string;
  email: string;
};

type UserResponse = { user: User };
type ErrorResponse = { error: string };

type ApiResponse = UserResponse | ErrorResponse;

export async function CreateUserIfNotExists(data: User): Promise<ApiResponse> {
  try {
    const response = await axios.get<UserResponse>("/api/user");
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      try {
        const response = await axios.post<UserResponse>("/api/user", data);
        return response.data;
      } catch (createErr: unknown) {
        if (axios.isAxiosError(createErr)) {
          return {
            error:
              typeof createErr.response?.data === "object" &&
              createErr.response?.data &&
              "error" in createErr.response.data &&
              typeof createErr.response.data.error === "string"
                ? createErr.response.data.error
                : createErr.message,
          };
        }

        return { error: "Error while creating user" };
      }
    }

    if (axios.isAxiosError(err)) {
      return { error: err.message };
    }

    return { error: "Internal Server Error" };
  }
}
