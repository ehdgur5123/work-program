import { XCircleIcon } from "@heroicons/react/24/solid";
interface NameListProps {
  nameList?: string[];
  isEditable?: boolean;
  onDelete?: (item: string) => void;
}

export default function NameList({
  nameList,
  isEditable,
  onDelete,
}: NameListProps) {
  return (
    <div className="h-40 border-2 w-full p-5 text-center grid grid-cols-2 overflow-auto gap-x-2 gap-y-10 pb-10">
      {nameList?.map((item, index) => (
        <div
          key={index}
          className="py-1 px-3 border h-fit rounded-2xl min-w-20 truncate relative"
        >
          {item}
          {isEditable && (
            <button
              type="button"
              className="cursor-pointer hover:text-gray-400 active:scale-95 absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
              onClick={() => onDelete?.(item)}
            >
              <XCircleIcon className="size-7" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
