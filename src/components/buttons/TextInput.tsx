import { ChangeEvent, useState } from 'react';

type Props = {
  placeholder?: string;
};

export default function TextInput({ placeholder = '' }: Props) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        id="user-input"
        className="px-8 py-5 text-base font-medium tracking-normal text-black bg-white border border-solid border-stone-300 rounded-[32px] w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}
