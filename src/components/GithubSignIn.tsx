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
        className="w-[400px] bg-black text-white font-bold px-[20px] py-[6px] rounded-3xl"
      >
        Signin with GitHub
      </button>
    </form>
  );
}
