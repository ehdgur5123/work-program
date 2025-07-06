interface MoreLinkProps {
  pages: number;
  currentPage: number;
  nextPage: (page: number) => void;
}

export default function NextPage({
  pages,
  currentPage,
  nextPage,
}: MoreLinkProps) {
  const pageLists: number[] = [];

  for (let i = 1; i <= pages; i++) {
    pageLists.push(i);
  }

  return (
    <div className="flex gap-2 pb-3 items-center justify-center">
      {pageLists.map((i) => (
        <button
          key={i}
          className={
            currentPage === i
              ? "bg-gray-600 px-3 py-1 rounded-2xl"
              : "bg-gray-200 px-3 py-1 rounded-2xl  hover:bg-gray-600 text-black hover:text-white active:scale-90 cursor-pointer"
          }
          onClick={() => nextPage(i)}
          disabled={currentPage === i}
        >
          {i}
        </button>
      ))}
    </div>
  );
}
