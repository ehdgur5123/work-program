interface InputFormProps {
  label: string;
  category?: string[] | null;
}

export default function InputForm({ label, category }: InputFormProps) {
  console.log(category);
  return (
    <div className="flex items-center gap-2 ">
      <label htmlFor={label} className="w-20 text-2xl font-bold text-center">
        {label}
      </label>
      input
      <input
        type="text"
        id={label}
        className="bg-white flex-1 p-2 border border-gray-300 rounded"
      />
    </div>
  );
}
