import React, { useState } from 'react';
import { TiCancel } from 'react-icons/ti';
import ColorTheme from '$libs/types/Theme.ts';
import OptionButton from '@components/buttons/OptionButton.tsx';
import IconButton from '@components/buttons/IconButton.tsx';
import ConfigAddress from '@components/forms/inputs/ConfigAddress.tsx';
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
  onSchedule?: (
    current: string,
    address: string,
    swap: boolean,
  ) => Promise<void>;
  onCancel?: () => Promise<void>;
};

function ScheduleTravelForm({ theme, onSchedule, onCancel }: Props) {
  const [swap, setSwap] = useState(false);
  const [address, setAddress] = useState('');
  const [option, setOption] = useState(0);

  const onClickSchedule = async () => {
    const item = searchCurrentItem(option);

    if (onSchedule && item !== undefined) {
      await onSchedule(address, item.description, swap);
    }
  };

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
      setSwap(!swap);
    };

    if (swap) {
      return (
        <>
          <LayoutInputContainer>
            <SearchAddress
              label={'Inicio de viaje'}
              theme={theme}
              value={address}
              onChange={setAddress}
            />
          </LayoutInputContainer>

          <LayoutInputContainer>
            <ConfigAddress
              label={'Fin del viaje'}
              theme={theme}
              onSwap={onSwap}
              defaultLocationList={defaultLocationList}
              onSelect={setOption}
              select={option}
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
              onSelect={setOption}
              select={option}
            />
          </LayoutInputContainer>

          <LayoutInputContainer>
            <SearchAddress
              label={'Fin del viaje'}
              theme={theme}
              value={address}
              onChange={setAddress}
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

        <OptionButton
          label={'Agendar'}
          theme={theme}
          onClick={onClickSchedule}
        />
      </div>
    </form>
  );
}

export default ScheduleTravelForm;
