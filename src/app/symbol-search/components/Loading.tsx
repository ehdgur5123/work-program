export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}

export function LoadingSpinnerSmall() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-4 h-4 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}
