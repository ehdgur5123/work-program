"use client";

export default function TopToScroll() {
  return (
    <div className="bg-yellow-50 fixed bottom-0 h-10 left-1/2 -translate-x-1/2 p-1 w-[300px] text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m4.5 18.75 7.5-7.5 7.5 7.5"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m4.5 12.75 7.5-7.5 7.5 7.5"
        />
      </svg>
    </div>
  );
}
