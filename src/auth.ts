import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials"
import User from "./models/User";
import bcrypt from "bcryptjs"

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

        // 이메일과 비밀번호로 사용자 인증
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
          return { id: user._id, name: user.name, email: user.email }; // 사용자 정보를 반환
        } else {
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',  // 로그인 페이지 경로
  },
});