import { auth } from "@/auth";
import Chat from "./_components/Chat";

export default async function ChatBotPage() {
  const session = await auth();

  if (!session) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center text-[20px] font-bold gap-[10px]">
        <h1>죄송합니다.</h1>
        <h1>이 페이지를 이용하시려면 로그인을 하십시오.</h1>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <div className="text-[28px] font-bold p-[80px]">Talk to AI Bot</div>
      <Chat />
    </main>
  );
}
