import Link from "next/link";

interface AuthFooterProps {
  link: "signin" | "signup";
}

const footerConfig: Record<
  AuthFooterProps["link"],
  { href: string; guideText: string; linkText: string }
> = {
  signin: {
    href: "/signup",
    guideText: "계정이 없으신가요?",
    linkText: "회원가입",
  },
  signup: {
    href: "/signin",
    guideText: "이미 계정이 있으신가요?",
    linkText: "로그인",
  },
};

export default function AuthFooter({ link }: AuthFooterProps) {
  const config = footerConfig[link];

  return (
    <div className="text-center text-sm text-gray-400 pt-8">
      {config.guideText}{" "}
      <Link
        href={config.href}
        className="text-white hover:text-gray-200 underline-offset-2 hover:underline transition"
      >
        {config.linkText}
      </Link>
    </div>
  );
}
