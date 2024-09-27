"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const labelClassName = "text-[18px] font-bold";
const inputClassName = "w-[350px] py-[3px] pl-[10px] border rounded-sm";

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null); // Reset error message

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setErrorMessage("Email and Password are required.");
      return;
    }

    const res = await signIn("credentials", {
      email,
      password,
    });

    if (res?.error) {
      setErrorMessage(res.error);
    } else {
      alert("로그인 성공하였습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[6px]">
        <label htmlFor="email" className={labelClassName}>
          Email
        </label>
        <input
          name="email"
          id="email"
          type="email"
          placeholder="Enter your Email"
          className={inputClassName}
        />
      </div>
      <div className="flex flex-col gap-[6px]">
        <label htmlFor="password" className={labelClassName}>
          Password
        </label>
        <input
          name="password"
          id="password"
          type="password"
          placeholder="Enter your password"
          className={inputClassName}
        />
      </div>
      {errorMessage && <div className="text-red-600">{errorMessage}</div>}
      <button
        type="submit"
        className="w-[380px] font-bold bg-red-600 text-[20px] text-white p-[5px] rounded-3xl mt-[20px] hover:scale-110 hover:bg-red-700 duration-200"
      >
        Login
      </button>
    </form>
  );
}
