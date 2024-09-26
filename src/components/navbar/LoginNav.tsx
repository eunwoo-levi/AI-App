"use client";

import React from "react";
import SignOutButton from "../auth/SignOutButton";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function LoginNav() {
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
        <div>
          <span className="text-[16px] font-semibold mr-[20px]">
            {session.user?.name} 님
          </span>
          <SignOutButton />
        </div>
      ) : (
        <Link
          href="/login"
          className="w-[100px] font-bold bg-red-600 text-white p-[10px] rounded-3xl hover:bg-red-700 duration-200"
        >
          LOGIN
        </Link>
      )}
    </div>
  );
}
