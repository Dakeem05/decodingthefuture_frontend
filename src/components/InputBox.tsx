type TInput = {
  type: string;
  placeholder: string;
  value: any
  onChange: (newValue: string) => void;
};

export default function InputBox({ type, placeholder, value, onChange }: TInput) {
  return (
    <>
      <input
        type={type}
        className="border text-base lg:text-xl rounded-lg border-[#0057FF] text-white outline-none bg-transparent lg:px-6 lg:py-7 px-3 py-4 w-full"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}
