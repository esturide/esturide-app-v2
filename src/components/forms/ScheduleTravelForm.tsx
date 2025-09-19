import React, { useState } from 'react';
import { TiCancel } from 'react-icons/ti';
import ColorTheme from '$libs/types/Theme.ts';
import OptionButton from '@components/buttons/OptionButton.tsx';
import IconButton from '@components/buttons/IconButton.tsx';
import ConfigAddress from '@components/forms/inputs/ConfigAddress.tsx';
import SearchAddress from '@components/forms/inputs/SearchAddress.tsx';
import { LatLng } from '$libs/types/LatLng.ts';
import defaultLocationList, {
  searchCurrentItem,
} from '$libs/const/defaultLocations.ts';

export interface CurrentOption {
  name: string;
  location: LatLng;
}

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

function ScheduleTravelForm({ theme, swap, onSchedule, onCancel }: Props) {
  const [address, setAddress] = useState('');
  const [option] = useState(0);

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
    if (swap) {
      return (
        <>
          <LayoutInputContainer>
            <SearchAddress label={'Inicio de viaje'} theme={theme} />
          </LayoutInputContainer>

          <LayoutInputContainer>
            <ConfigAddress
              label={'Fin del viaje'}
              theme={theme}
              defaultLocationList={defaultLocationList}
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
              defaultLocationList={defaultLocationList}
            />
          </LayoutInputContainer>

          <LayoutInputContainer>
            <SearchAddress label={'Fin del viaje'} theme={theme} />
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
