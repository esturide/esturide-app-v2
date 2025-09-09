import React from 'react';
import { FaSearch } from 'react-icons/fa';
import ColorTheme from '$libs/types/Theme.ts';
import UserInputIcon from '@components/input/UserInputIcon.tsx';

type Props = {
  theme: ColorTheme;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
};

const SearchAddress = ({ theme, label, value, onChange }: Props) => {
  return (
    <UserInputIcon
      name={'search-address'}
      placeholder={'Direccion'}
      icon={FaSearch}
      label={label}
      theme={theme}
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchAddress;
