import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <button
          onClick={() => signOut()}
          className="cursor-pointer hover:scale-110 active:scale-90 w-15 h-15 overflow-hidden"
        >
          <img
            src={session.user?.image || "/google-login-dark.svg"}
            alt="구글 로그인 버튼"
            className="w-full h-full object-cover rounded-full p-2"
          />
        </button>
      </>
    );
  }
  return (
    <>
      <button
        onClick={() => signIn()}
        className="cursor-pointer hover:scale-110 active:scale-90 w-15 h-15"
      >
        <img
          src="/google-login-dark.svg"
          alt="구글 로그인 버튼"
          className="w-full h-full object-cover rounded-full p-2"
        />
      </button>
    </>
  );
}
