import React from 'react';
import { FaSearch } from 'react-icons/fa';
import ColorTheme from '$libs/types/Theme.ts';
import UserInputIcon from '@components/input/UserInputIcon.tsx';

type Props = {
  theme: ColorTheme;
  label?: string;
  name?: string;
};

const SearchAddress = ({ theme, label, name = 'search-address' }: Props) => {
  return (
    <UserInputIcon
      name={name}
      placeholder={'Direccion'}
      icon={FaSearch}
      label={label}
      theme={theme}
    />
  );
};

export default SearchAddress;
