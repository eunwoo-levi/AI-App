import { signIn } from "@/auth";

export default function GoogleSignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        type="submit"
        className="w-[400px] bg-blue-500 text-white font-bold px-[20px] py-[6px] rounded-3xl"
      >
        Signin with Google
      </button>
    </form>
  );
}
