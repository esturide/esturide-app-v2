import React, { useEffect, useState } from 'react';
import UserInputIcon from '@components/input/UserInputIcon.tsx';
import { FaBackspace, FaExchangeAlt, FaSearch } from 'react-icons/fa';
import OptionButton from '@components/buttons/OptionButton.tsx';
import IconButton from '@components/buttons/IconButton.tsx';
import SelectOptions from '@components/input/selector/SelectOptions.tsx';
import ColorTheme from '$libs/types/Theme.ts';
import defaultLocationList, {
  searchCurrentItem,
} from '$libs/const/defaultLocations.ts';

type Props = {
  theme: ColorTheme;
  onSwap?: (state: boolean) => void;
  onSearch?: (address: string) => Promise<void>;
  onSchedule?: (addressFrom: string, addressTo: string) => Promise<void>;
  onCancel?: () => void;
};

function ScheduleForm({
  theme,
  onSwap,
  onSearch,
  onSchedule,
  onCancel,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [address, setAddress] = useState('');
  const [addressOption, setAddressOption] = useState('');

  const [swapTravelStatus, setSwapTravelStatus] = useState(false);

  useEffect(() => {
    if (onSwap) {
      onSwap(swapTravelStatus);
    }
  }, [swapTravelStatus]);

  useEffect(() => {
    const request = async () => {
      if (onSearch) {
        await onSearch(address);
      }
    };

    request();
  }, [address]);

  const ChangeButton = () => {
    return (
      <IconButton
        icon={FaExchangeAlt}
        theme={theme}
        onClick={() => {
          setSwapTravelStatus(!swapTravelStatus);
        }}
      />
    );
  };

  const CancelButton = () => {
    return <IconButton icon={FaBackspace} theme={'gray'} onClick={onCancel} />;
  };

  const SearchAddress = () => {
    return (
      <UserInputIcon
        placeholder={'Direccion'}
        icon={FaSearch}
        theme={theme}
        value={address}
        onChange={async (address: string) => {
          setAddress(address);
        }}
      />
    );
  };

  const SelectAddress = () => {
    useEffect(() => {
      const item = searchCurrentItem(currentIndex);

      if (item !== undefined) {
        setAddressOption(item.description);
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
      if (swapTravelStatus) {
        await onSchedule(address, addressOption);
      } else {
        await onSchedule(addressOption, address);
      }
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
    <form className={'grow flex flex-col justify-start gap-4'}>
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
