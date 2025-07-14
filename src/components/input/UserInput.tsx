import {
  ChangeEvent,
  FocusEvent,
  useId,
  useState,
  forwardRef,
  useImperativeHandle
} from 'react';
import { isAdult, emailRegex } from '@/utils/validators';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type ValidationType = 'adult' | 'email' | 'match' | 'required';

export type UserInputRef = {
  validate: () => boolean;
};

type Props = {
  label?: string;
  value: string;
  type?: 'text' | 'number' | 'password' | 'date';
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => Promise<void>;
  onFocus?: (value: string) => Promise<void>;
  hasError?: (hasError: boolean) => void;
  validations?: ValidationType[];
  matchValue?: string; 
};

const UserInput = forwardRef<UserInputRef, Props>(({
  label,
  value,
  type = 'text',
  placeholder = '',
  onChange,
  onBlur,
  onFocus,
  hasError,
  validations = ['required'],
  matchValue = '',
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const id = useId();

  const validateInput = (val: string): boolean => {
    const newMessages: string[] = [];

    const fullValidations = validations.includes('required')
      ? validations
      : ['required', ...validations];

    if (fullValidations.includes('required') && val.trim() === '') {
      newMessages.push('Este campo es obligatorio.');
    }

    if (fullValidations.includes('adult') && !isAdult(val)) {
      newMessages.push('Debes tener al menos 18 años.');
    }

    if (fullValidations.includes('email') && !emailRegex.test(val)) {
      newMessages.push('El correo electrónico no es válido.');
    }

    if (fullValidations.includes('match') && matchValue !== undefined && val !== matchValue) {
      newMessages.push('Las contraseñas no coinciden.');
    }

    setMessages(newMessages);
    hasError?.(newMessages.length > 0);
    return newMessages.length === 0;
  };

  // Exponer método `validate` al padre
  useImperativeHandle(ref, () => ({
    validate: () => validateInput(value),
  }));

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
    validateInput(newValue);
  };

  const handleBlur = async (event: FocusEvent<HTMLInputElement>) => {
    validateInput(event.target.value);
    if (onBlur) await onBlur(event.target.value);
  };

  const handleFocus = async (event: FocusEvent<HTMLInputElement>) => {
    if (onFocus) await onFocus(event.target.value);
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={id} className="my-2 mx-2 text-left text-sm font-medium text-teal-900">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          type={type === 'password' && showPassword ? 'text' : type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          className={`px-3 py-2 rounded-md w-full border ${
            messages.length > 0 ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>

      {messages.length > 0 && (
        <div className="mt-1 ml-1">
          {messages.map((msg, i) => (
            <p key={i} className="text-red-500 text-sm">{msg}</p>
          ))}
        </div>
      )}
    </div>
  );
});

export default UserInput;
