import React, { useEffect, useState } from 'react';
import { TiCancel } from 'react-icons/ti';
import ColorTheme from '$libs/types/Theme.ts';
import OptionButton from '@components/buttons/OptionButton.tsx';
import IconButton from '@components/buttons/IconButton.tsx';
import ConfigAddress from '@components/forms/inputs/ConfigAddress.tsx';
import SearchAddress from '@components/forms/inputs/SearchAddress.tsx';
import { StringOption } from '@components/input/selector/SelectOptions.tsx';
import { LatLng } from '$libs/types/LatLng.ts';
import messageInformation from '$libs/toast/message.ts';

export interface CurrentOption {
  name: string;
  location: LatLng;
}

interface LocationOption extends StringOption {
  location: LatLng;
}

const defaultLocationList: LocationOption[] = [
  {
    id: 0,
    description: 'CUTONALA',
    location: {
      lat: 20.56680439042432,
      lng: -103.22286936854996,
    },
  },
  {
    id: 1,
    description: 'CUCEI',
    location: {
      lat: 20.659772643172136,
      lng: -103.32453742113104,
    },
  },
  {
    id: 3,
    description: 'CUAAD',
    location: {
      lat: 20.73926734516559,
      lng: -103.31177341496343,
    },
  },
  {
    id: 4,
    description: 'CUCSH',
    location: {
      lat: 20.738665021477242,
      lng: -103.37846536266854,
    },
  },
  {
    id: 5,
    description: 'GUGDL',
    location: {
      lat: 20.694282978877933,
      lng: -103.35005580270655,
    },
  },
  {
    id: 6,
    description: 'CUCBA',
    location: {
      lat: 20.747260897834302,
      lng: -103.5127255548985,
    },
  },
  {
    id: 7,
    description: 'CUTLAJO',
    location: {
      lat: 20.465505894192166,
      lng: -103.41401115900983,
    },
  },
  {
    id: 8,
    description: 'CUCEA',
    location: {
      lat: 20.739605446415595,
      lng: -103.38183220518847,
    },
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
  swap: boolean;
  setSwap: (status: boolean) => void;
  onSchedule?: (
    current: CurrentOption,
    address: string,
    swap: boolean,
  ) => Promise<void>;
  onCancel?: () => Promise<void>;
};

function ScheduleTravelForm({
  theme,
  swap,
  setSwap,
  onSchedule,
  onCancel,
}: Props) {
  const [address, setAddress] = useState('');
  const [option, setOption] = useState(0);

  useEffect(() => {
    if (swap) {
      messageInformation('Viaje de regreso a casa.');
    } else {
      messageInformation('Viaje de salida de casa.');
    }
  }, []);

  const onClickSchedule = async () => {
    const item = searchCurrentItem(option);

    if (onSchedule && item !== undefined) {
      await onSchedule(
        { name: item.description, location: item.location },
        address,
        swap,
      );
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
