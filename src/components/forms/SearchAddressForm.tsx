import React, { useState } from 'react';
import ColorTheme from '$libs/types/Theme.ts';
import LocationAddress from '$libs/types/LocationAddress.ts';
import { searchLocationFromAddress } from '$libs/request/search.ts';
import { getRequestRoot } from '$libs/request/api.ts';
import { failureMessage } from '$libs/toast/failure.ts';
import UserInputIcon from '@components/input/UserInputIcon.tsx';
import { FaSearch } from 'react-icons/fa';
import loaderEffect from '$libs/loaderEffect.ts';
import SpinnerLoader from '@components/resources/SpinnerLoader.tsx';
import PartialScreenContainer from '@layouts/container/PartialScreenContainer.tsx';
import ScrollLayout from '@layouts/scroll/ScrollLayout.tsx';

type Props = {
  theme: ColorTheme;
};

function SearchAddressForm({ theme }: Props) {
  const [addressResults, setAddressResults] = useState<LocationAddress[]>([]);
  const [currentAddress, setCurrentAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async (address: string) => {
    setCurrentAddress(address);

    await loaderEffect(async () => {
      const status = await searchLocationFromAddress(
        getRequestRoot(),
        address,
        setAddressResults,
      );

      if (!status) {
        failureMessage('Direccion no encontrada');
      }
    }, setIsLoading);
  };

  const ShowAllResults = () => {
    if (isLoading) {
      return (
        <PartialScreenContainer>
          <SpinnerLoader />
        </PartialScreenContainer>
      );
    }

    return (
      <ScrollLayout>
        {addressResults.map(result => (
          <div
            className={
              'text-left text-wrap p-2 my-2 rounded-xl bg-red-300 focus:outline-none focus:bg-green-300 '
            }
          >
            {result.address}
          </div>
        ))}
      </ScrollLayout>
    );
  };

  return (
    <div className={'flex flex-col bg-red-500/10'}>
      <div className={'flex bg-green-300'}>
        <UserInputIcon
          placeholder={'Direccion'}
          icon={FaSearch}
          value={currentAddress}
          name={'address'}
          onChange={onClick}
          theme={theme}
        />
      </div>

      <div className={'flex bg-yellow-300 h-full justify-center'}>
        <ShowAllResults />
      </div>
    </div>
  );
}

export default SearchAddressForm;
