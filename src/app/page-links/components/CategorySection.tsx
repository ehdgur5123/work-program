"use client";

interface CategorySectionProps {
  label: string;
  categories: [string, { sum: number }][];
  selected?: string;
  onSelect: (name: string) => void;
}

export default function CategorySection({
  label,
  categories,
  selected,
  onSelect,
}: CategorySectionProps) {
  return (
    <div className="flex gap-2 h-15 items-center p-2 border-2">
      <p className="p-2 bg-gray-500 mr-3">{label}</p>
      <div className="flex ">
        {categories.map(([name, data]) => (
          <p
            key={name}
            className={`font-bold p-2 rounded-2xl cursor-pointer hover:bg-gray-500 active:scale-90 ${
              selected === name ? "text-red-500" : ""
            }`}
            onClick={() => onSelect(name)}
          >
            {name} ({data.sum})
          </p>
        ))}
      </div>
    </div>
  );
}
