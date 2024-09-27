import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import User from "./models/User";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "./lib/mongodb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        await connectMongoDB()

        const user = await User.findOne({ email });

        if (user) {
          const isPasswordValid = await bcrypt.compare(password, user.password)
          if(!isPasswordValid){
            throw new Error("Invalid password")
          }

          return {  name: user.name, email: user.email };
        } else {
          throw new Error("Invalid email");
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
});
