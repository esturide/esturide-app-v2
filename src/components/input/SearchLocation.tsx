import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

type Props = {
  label?: string;
  value?: string;
  placeholder?: string;
  options?: string[];
  onChange?: (value: string) => void;
  onSelect?: (value: string) => void;
  className?: string;
  disabled?: boolean;
};

const SearchLocation: React.FC<Props> = ({
  label = 'Destino',
  value = 'CUTONALA',
  placeholder = 'Escribe para buscar...',
  options,
  onChange,
  onSelect,
  className = '',
  disabled = false,
}) => {
  const defaultOptions = useMemo(
    () => [
      'CUTONALA',
      'CUCEI',
      'CUCEA',
      'CUCS',
      'CUCSH',
      'CUCBA',
      'CUTLAJO',
      'CUAAD',
    ],
    [],
  );

  const optionsList = options || defaultOptions;

  const [inputValue, setInputValue] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (inputValue.trim() === '') {
      setFilteredOptions(optionsList);
    } else {
      const filtered = optionsList.filter(option =>
        option.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setFilteredOptions(filtered);
    }
    setHighlightedIndex(-1);
  }, [inputValue, optionsList]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    onChange?.(newValue);
  };

  const handleOptionSelect = (option: string) => {
    setInputValue(option);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onSelect?.(option);
    onChange?.(option);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    setTimeout(() => {
      if (e === null) {
        return;
      }

      if (!e.currentTarget.contains(e.relatedTarget)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        return;
      }
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1,
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleIconClick = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className={`flex flex-col pb-4 whitespace-nowrap max-w-[290px] ${className}`}
    >
      <label
        htmlFor="destination-input"
        className="z-10 self-start ml-5 text-base font-bold text-teal-900"
      >
        {label}
      </label>
      <div className="relative" onBlur={handleInputBlur}>
        <input
          ref={inputRef}
          id="destination-input"
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="flex justify-center items-start px-8 py-5 mt-2 w-full text-base font-medium tracking-normal text-center bg-white border border-solid border-slate-800 min-h-14 rounded-[32px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`${label} input field`}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          role="combobox"
        />
        <button
          type="button"
          onClick={handleIconClick}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
          aria-label={isOpen ? 'Cerrar lista' : 'Abrir lista'}
        >
          <FaAngleDown
            className={`object-contain transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && filteredOptions.length > 0 && (
          <ul
            ref={listRef}
            role="listbox"
            aria-label="Opciones disponibles"
            className="absolute z-20 w-full mt-1 bg-white border border-slate-800 rounded-2xl shadow-lg max-h-60 overflow-y-auto"
          >
            {filteredOptions.map((option, index) => (
              <li
                key={option}
                role="option"
                aria-selected={highlightedIndex === index}
                className={`px-6 py-3 cursor-pointer text-base font-medium text-slate-800 hover:bg-teal-50 first:rounded-t-2xl last:rounded-b-2xl ${
                  highlightedIndex === index ? 'bg-teal-100' : ''
                }`}
                onClick={() => handleOptionSelect(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}

        {isOpen && filteredOptions.length === 0 && inputValue.trim() !== '' && (
          <div className="absolute z-20 w-full mt-1 bg-white border border-slate-800 rounded-2xl shadow-lg px-6 py-3">
            <p className="text-base font-medium text-slate-500 text-center">
              No se encontraron resultados
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchLocation;
