import React from 'react';
import { FaSearch } from 'react-icons/fa';
import ColorTheme from '$libs/types/Theme.ts';
import UserInputIcon from '@components/input/UserInputIcon.tsx';
import { PrimitiveAtom } from 'jotai';
import { useAtom } from 'jotai';

type Props = {
  theme: ColorTheme;
  label?: string;
  address: PrimitiveAtom<string>;
};

const SearchAddress = ({ theme, label, address }: Props) => {
  const [value, onChange] = useAtom(address);

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
