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
    <div className="flex gap-4 items-center justify-center">
      <label
        htmlFor={id}
        className="font-semibold text-white w-1/2 md:text-lg text-sm"
      >
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
        className="text-white border-2 px-2 py-1 rounded-sm w-1/2 md:text-lg text-sm"
      />
    </div>
  );
}
