import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";

interface AuthButtonProps {
  provider: "normal" | "google" | "naver";
  handleClick: () => void;
  text: string;
}

export default function AuthButton({
  provider,
  handleClick,
  text,
}: AuthButtonProps) {
  const baseStyle =
    "flex items-center justify-center gap-3 w-full py-3 rounded-xl font-medium border transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer";

  const config = {
    normal: {
      className: `${baseStyle} bg-gradient-to-r from-gray-100 to-white text-gray-900 border-gray-300 hover:bg-gray-200`,
      type: "submit" as const,
    },
    google: {
      className: `${baseStyle} bg-white text-gray-900 border-gray-300 hover:bg-gray-100`,
      icon: <FcGoogle size={22} />,
      type: "button" as const,
    },
    naver: {
      className: `${baseStyle} bg-[#03C75A] text-white border-[#03C75A] hover:bg-[#02b14f]`,
      icon: <SiNaver size={20} />,
      type: "button" as const,
    },
  }[provider];

  return (
    <button
      onClick={handleClick}
      className={config.className}
      type={config.type}
    >
      {config.icon && <span>{config.icon}</span>}
      <span>{text}</span>
    </button>
  );
}
