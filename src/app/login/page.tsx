import { auth } from "@/auth";
import GithubSignIn from "@/components/auth/GithubSignIn";
import GoogleSignIn from "@/components/auth/GoogleSignIn";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <main className="w-full flex flex-col items-center pt-[20px]">
      <div className="w-[480px] flex flex-col items-center border border-blue-500 p-[50px] rounded-xl shadow-md shadow-blue-300">
        <h1 className="text-[40px] font-bold pb-[40px] text-blue-700">Login</h1>
        <LoginForm />
        <div className="flex gap-[10px] mt-[50px]">
          <p>Don't have an account?</p>
          <Link
            href="/register"
            className="text-blue-500 font-semibold underline"
          >
            Register
          </Link>
        </div>
        <section className="pt-[20px] flex flex-col gap-[5px]">
          <GithubSignIn />
          <GoogleSignIn />
        </section>
      </div>
    </main>
  );
}
