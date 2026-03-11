import axios from "axios";
import prisma from "../../lib/prisma";

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
  } catch (err: any) {
    if (err.response?.status === 404) {
      try {
        const response = await axios.post<UserResponse>("/api/user", data);
        return response.data;
      } catch (err) {
        return { error: "Error while creating user" };
      }
    }
    return { error: "Internal Server Error" };
  }
}
