interface AuthInputProps {
  label: string;
  id: string;
  type: "email" | "password";
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
}

export default function AuthInput({
  label,
  id,
  handleChange,
  placeholder,
  value,
  type,
}: AuthInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-300 text-sm mb-2">
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={(e) => handleChange(e)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-800/50 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
      />
    </div>
  );
}
