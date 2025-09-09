import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import UserInputIcon from '@components/input/UserInputIcon.tsx';
import LocationsResponse from '$libs/request/response/location.ts';
import { searchLocationFromAddress } from '$libs/request/search.ts';
import { getRequestRoot } from '$libs/request/api.ts';

type Props = {
  onSearch?: (results: LocationsResponse[]) => void;
};

const SearchAddress = ({ onSearch }: Props) => {
  const [addressResults, setAddressResults] = useState<LocationsResponse[]>([]);

  useEffect(() => {
    console.log(searchLocationFromAddress);
  }, [searchLocationFromAddress]);

  const onClick = async (address: string) => {
    console.log('!');

    const status = await searchLocationFromAddress(
      getRequestRoot(),
      address,
      setAddressResults,
    );

    if (onSearch !== undefined && status) {
      onSearch(addressResults);
    }
  };

  return (
    <UserInputIcon
      placeholder={'Direccion'}
      icon={FaSearch}
      name={'address'}
      onClick={onClick}
    />
  );
};

export default SearchAddress;
