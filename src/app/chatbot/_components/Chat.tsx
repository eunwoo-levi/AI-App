"use client";

import { useChat } from "ai/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const [error, setError] = useState<string | null>(null);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/openai",
    onError: (err: Error) => {
      console.error("Chat error:", err);
      if (err.message.includes("usage limit")) {
        setError(
          "API usage limit reached. Please try again later or contact support."
        );
      } else {
        setError(
          "An error occurred while sending the message. Please try again."
        );
      }
    },
  });

  const chatContainer = useRef<HTMLDivElement>(null);

  const scroll = () => {
    const { offsetHeight, scrollHeight, scrollTop } =
      chatContainer.current as HTMLDivElement;
    if (scrollHeight > scrollTop + offsetHeight) {
      chatContainer.current?.scrollTo(0, scrollHeight + 200);
    }
  };

  useEffect(() => {
    scroll();
  }, [messages]);

  const renderResponse = () => {
    return (
      <div>
        {messages.map((m, idx) => (
          <div key={idx} className="flex items-start mb-4">
            <Image
              width={50}
              height={50}
              alt="avatar"
              src={
                m.role === "user"
                  ? "/chatbot/UserAvatar.webp"
                  : "/chatbot/AiAvatar.webp"
              }
              className="w-[50px] h-[50px] rounded-full mr-4"
            />
            <div className="flex-grow">
              <p className="mb-2">{m.content}</p>
              {idx < messages.length - 1 && <hr className="my-2" />}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main ref={chatContainer} className="w-full flex flex-col items-center">
      <section className="flex-grow overflow-y-auto px-[30px] lg:px-[100px] pb-[30px]">
        {renderResponse()}
        {error && (
          <div className="text-red-500 mb-4 p-2 bg-red-100 rounded">
            {error}
          </div>
        )}
      </section>
      <div className="w-full h-[100px]" />
      <section className="fixed bottom-0 left-0 right-0 p-4 shadow-md flex justify-center bg-neutral-800 bg-opacity-20">
        <form
          onSubmit={handleSubmit}
          className="w-[800px] bg-white border flex rounded-2xl justify-between"
        >
          <textarea
            name="input-field"
            value={input}
            onChange={handleInputChange}
            placeholder="Say anything"
            className="text-black flex-grow pl-[20px] outline-none rounded-3xl pt-[5px] resize-none"
          />
          <button
            type="submit"
            className="w-[50px] text-white bg-black rounded-full"
          >
            Send
          </button>
        </form>
      </section>
    </main>
  );
}
