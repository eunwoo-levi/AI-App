import { signIn } from "@/auth";

export default function GithubSignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button
        type="submit"
        className="w-[380px] bg-black text-white font-bold px-[20px] py-[8px] rounded-3xl hover:scale-105 duration-200"
      >
        Signin with GitHub
      </button>
    </form>
  );
}
