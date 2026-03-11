import { signIn } from "next-auth/react";

export function LoginPage() {
  return (
    <div className="card w-full flex flex-col px-10">
      <div className="items-center justify-center flex h-dvh">
        <button
          onClick={() => {
            signIn("google");
          }}
          className="text-white flex p-4 rounded-2xl shadow-lg shadow-black/20
							cursor-pointer hover:bg-blue-700 bg-blue-600 duration-150"
        >
          Log in with Google
        </button>
      </div>
    </div>
  );
}
