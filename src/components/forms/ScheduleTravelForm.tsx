import React, { useEffect, useRef, useState } from 'react';
import { TiCancel } from 'react-icons/ti';
import ColorTheme from '$libs/types/Theme.ts';
import OptionButton from '@components/buttons/OptionButton.tsx';
import IconButton from '@components/buttons/IconButton.tsx';
import ConfigAddress from '@components/forms/inputs/ConfigAddress.tsx';
import LocationsResponse from '$libs/request/response/location.ts';
import SearchAddress from '@components/forms/inputs/SearchAddress.tsx';
import { StringOption } from '@components/input/selector/SelectOptions.tsx';

const defaultLocationList: StringOption[] = [
  {
    id: 0,
    description: 'CUTONALA',
  },
  {
    id: 1,
    description: 'CUCEI',
  },
  {
    id: 3,
    description: 'CUAAD',
  },
  {
    id: 4,
    description: 'CUCSH',
  },
  {
    id: 5,
    description: 'GUGDL',
  },
  {
    id: 6,
    description: 'CUCBA',
  },
  {
    id: 7,
    description: 'CUTLAJO',
  },
  {
    id: 8,
    description: 'CUCEA',
  },
] as const;

const searchCurrentItem = (index: number) => {
  for (const item of defaultLocationList) {
    if (item.id == index) {
      return item;
    }
  }
};

type Props = {
  theme: ColorTheme;
  onSchedule?: (current: string, address: LocationsResponse) => Promise<void>;
  onCancel?: () => Promise<void>;
};

function ScheduleTravelForm({ theme, onCancel }: Props) {
  const [onSwapView, setOnSwapView] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  const [currentOption, setCurrentOption] = useState(0);

  useEffect(() => {
    console.log(currentOption);
  }, [currentOption]);

  const CancelButton = () => {
    return <IconButton icon={TiCancel} theme={'gray'} onClick={onCancel} />;
  };

  const LayoutInputContainer = ({ children }: React.PropsWithChildren) => {
    return (
      <div className={'flex justify-end items-end gap-2 flex-row'}>
        {children}
      </div>
    );
  };

  const AddressInputForms = () => {
    const onSwap = () => {
      setOnSwapView(!onSwapView);
    };

    if (onSwapView) {
      return (
        <>
          <LayoutInputContainer>
            <SearchAddress
              label={'Inicio de viaje'}
              theme={theme}
              value={currentAddress}
              onChange={setCurrentAddress}
            />
          </LayoutInputContainer>

          <LayoutInputContainer>
            <ConfigAddress
              label={'Fin del viaje'}
              theme={theme}
              onSwap={onSwap}
              defaultLocationList={defaultLocationList}
              onSelect={setCurrentOption}
              select={currentOption}
            />
          </LayoutInputContainer>
        </>
      );
    } else {
      return (
        <>
          <LayoutInputContainer>
            <ConfigAddress
              label={'Inicio de viaje'}
              theme={theme}
              onSwap={onSwap}
              defaultLocationList={defaultLocationList}
              onSelect={setCurrentOption}
              select={currentOption}
            />
          </LayoutInputContainer>

          <LayoutInputContainer>
            <SearchAddress
              label={'Fin del viaje'}
              theme={theme}
              value={currentAddress}
              onChange={setCurrentAddress}
            />
          </LayoutInputContainer>
        </>
      );
    }
  };

  return (
    <form className={'grow p-4 lg:h-screen flex flex-col justify-start gap-4'}>
      <div className={'grow flex flex-col'}>
        <AddressInputForms />
      </div>

      <div className={'flex flex-row gap-4 items-center'}>
        <CancelButton />

        <OptionButton label={'Agendar'} theme={theme} />
      </div>
    </form>
  );
}

export default ScheduleTravelForm;
