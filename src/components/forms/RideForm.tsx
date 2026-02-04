import React, { useEffect, useState } from 'react';
import UserInputIcon from '@components/input/UserInputIcon.tsx';
import {
  FaBackspace,
  FaCarSide,
  FaExchangeAlt,
  FaFlagCheckered,
  FaHome,
} from 'react-icons/fa';
import MediumButton from '@components/buttons/MediumButton.tsx';
import IconButton from '@components/buttons/IconButton.tsx';
import SelectOptions from '@components/input/selector/SelectOptions.tsx';
import ColorTheme from '$libs/types/Theme.ts';
import defaultLocationList, {
  searchCurrentItem,
} from '$libs/const/defaultLocations.ts';
import LineElementList, {
  LineItem,
} from '@components/resources/LineElementList.tsx';

type Props = {
  theme: ColorTheme;
  onSwap?: (state: boolean) => void;
  onSearchRequest?: (addressFrom: string, addressTo: string) => Promise<void>;
  onCancel?: () => void;
};

function RideForm({ theme, onSwap, onSearchRequest, onCancel }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [swapTravelStatus, setSwapTravelStatus] = useState(false);

  useEffect(() => {
    if (onSwap) {
      onSwap(swapTravelStatus);
    }
  }, [swapTravelStatus]);

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

  const HomeAddress = () => {
    return (
      <UserInputIcon
        icon={FaHome}
        theme={theme}
        value={'Regresar a casa'}
        readOnly
      />
    );
  };

  const SelectAddress = () => {
    useEffect(() => {
      const item = searchCurrentItem(currentIndex);
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

  const onSearchClick = async () => {};

  const TravelOptions = () => {
    const FromHome = () => {
      const elements: LineItem[] = [
        {
          title: 'Recogida',
          icon: FaCarSide,
          item: () => <SelectAddress />,
        },
        {
          title: 'Destino',
          icon: FaFlagCheckered,
          item: () => (
            <div className={'flex flex-row gap-2 items-center justify-center'}>
              <HomeAddress />
              <ChangeButton />
            </div>
          ),
        },
      ];

      return <LineElementList elements={elements} />;
    };

    const ReturnHome = () => {
      const elements: LineItem[] = [
        {
          title: 'Recogida',
          icon: FaCarSide,
          item: () => <HomeAddress />,
        },
        {
          title: 'Destino',
          icon: FaFlagCheckered,
          item: () => (
            <div className={'flex flex-row gap-2 items-center justify-center'}>
              <SelectAddress />
              <ChangeButton />
            </div>
          ),
        },
      ];

      return <LineElementList elements={elements} />;
    };

    if (swapTravelStatus) {
      return (
        <>
          <FromHome />
        </>
      );
    } else {
      return (
        <>
          <ReturnHome />
        </>
      );
    }
  };

  return (
    <form className={'grow flex flex-col justify-start gap-4'}>
      <div className={'px-6 py-4 rounded-3xl border border-stone-300'}>
        <TravelOptions />
      </div>

      <div className={'flex flex-row gap-2 items-center justify-center'}>
        <CancelButton />
        <MediumButton label={'Buscar'} theme={theme} onClick={onSearchClick} />
      </div>
    </form>
  );
}

export default RideForm;
