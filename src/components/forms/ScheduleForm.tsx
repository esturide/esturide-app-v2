import React, { useEffect, useState } from 'react';
import UserInputIcon from '@components/input/UserInputIcon.tsx';
import { FaBackspace, FaExchangeAlt, FaSearch } from 'react-icons/fa';
import OptionButton from '@components/buttons/OptionButton.tsx';
import IconButton from '@components/buttons/IconButton.tsx';
import SelectOptions from '@components/input/selector/SelectOptions.tsx';
import ColorTheme from '$libs/types/Theme.ts';
import defaultLocationList, {
  LocationOption,
  searchCurrentItem,
} from '$libs/const/defaultLocations.ts';
import { useAtom, useAtomValue } from 'jotai';
import {
  addressAtom,
  locationOptionAtom,
  swapTravelAtom,
} from '$libs/atoms/scheduleAtom.ts';

type Props = {
  theme: ColorTheme;
  onSchedule?: (
    current: LocationOption,
    address: string,
    swap: boolean,
  ) => Promise<void>;
  onCancel?: () => void;
};

function ScheduleForm({ theme, onSchedule, onCancel }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const swapTravelStatus = useAtomValue(swapTravelAtom);
  const currentAddress = useAtomValue(addressAtom);
  const currentLocation = useAtomValue(locationOptionAtom);

  const ChangeButton = () => {
    const [swapStatus, setSwapStatus] = useAtom(swapTravelAtom);

    return (
      <IconButton
        icon={FaExchangeAlt}
        theme={theme}
        onClick={() => {
          setSwapStatus(!swapStatus);
        }}
      />
    );
  };

  const CancelButton = () => {
    return <IconButton icon={FaBackspace} theme={'gray'} onClick={onCancel} />;
  };

  const SearchAddress = () => {
    const [currentAddress, setCurrentAddress] = useAtom(addressAtom);

    return (
      <UserInputIcon
        placeholder={'Direccion'}
        icon={FaSearch}
        theme={theme}
        value={currentAddress}
        onChange={setCurrentAddress}
      />
    );
  };

  const SelectAddress = () => {
    const [selectOptionIndex, setSelectOptionIndex] =
      useAtom(locationOptionAtom);

    useEffect(() => {
      const item = searchCurrentItem(currentIndex);

      if (item !== undefined) {
        setSelectOptionIndex(item);
      }
    }, [currentIndex]);

    return (
      <SelectOptions
        options={defaultLocationList}
        theme={theme}
        defaultValue={currentIndex}
        onSelect={setCurrentIndex}
      />
    );
  };

  const onScheduleClick = async () => {
    if (onSchedule) {
      await onSchedule(currentLocation, currentAddress, swapTravelStatus);
    }
  };

  const TravelOptions = () => {
    if (swapTravelStatus) {
      return (
        <>
          <SearchAddress />

          <div className={'flex flex-row gap-2 items-center justify-center'}>
            <SelectAddress />
            <ChangeButton />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={'flex flex-row gap-2 items-center justify-center'}>
            <SelectAddress />
            <ChangeButton />
          </div>

          <SearchAddress />
        </>
      );
    }
  };

  return (
    <form className={'grow p-4 lg:h-screen flex flex-col justify-start gap-4'}>
      <TravelOptions />
      <div className={'flex flex-row gap-2 items-center justify-center'}>
        <CancelButton />
        <OptionButton
          label={'Agendar'}
          theme={theme}
          onClick={onScheduleClick}
        />
      </div>
    </form>
  );
}

export default ScheduleForm;
