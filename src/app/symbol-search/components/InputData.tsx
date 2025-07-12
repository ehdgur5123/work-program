interface InputDataProps {
  label: string;
  id: string;
  placeholder: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputData({
  label,
  id,
  placeholder,
  value,
  handleChange,
}: InputDataProps) {
  return (
    <div className="flex gap-2 text-sm items-center">
      <label htmlFor={id} className="font-semibold text-gray-600 w-20">
        {label}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          handleChange(e);
        }}
        className="bg-white text-black border px-2 py-1 rounded text-xs"
      />
    </div>
  );
}
