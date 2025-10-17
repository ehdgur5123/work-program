interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-800">
        {/* Title */}
        <h2 className="text-center text-3xl font-semibold text-white mb-8 tracking-tight">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
