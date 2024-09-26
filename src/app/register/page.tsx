import React from "react";

export default function RegisterPage() {
  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <div className="border border-blue-500 p-[80px] rounded-2xl shadow-md shadow-blue-300">
        <h1 className="text-[30px] font-semibold mb-[80px]">Register</h1>
        <form className="flex flex-col gap-[20px]">
          <div className="flex flex-col">
            <label>* Email</label>
            <input placeholder="yourEmail@example.com" />
          </div>
          <div>
            <label>* password</label>
          </div>
        </form>
      </div>
    </main>
  );
}
