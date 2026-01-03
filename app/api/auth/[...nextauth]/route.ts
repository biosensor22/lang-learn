import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

export const AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
};

const handler = NextAuth(AuthOptions);
export { handler as GET, handler as POST };
