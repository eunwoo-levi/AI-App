import { auth } from "@/auth";

export default async function ChatBotPage() {
  const session = await auth();

  if (!session) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center text-[20px] font-bold">
        이 페이지에 대한 권한이 없습니다.
      </div>
    );
  }

  return <div>ChatBotPage</div>;
}
