import React, { useEffect, useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import { TiCancel } from 'react-icons/ti';
import ColorTheme from '$libs/types/Theme.ts';
import SelectOptions, {
  StringOption,
} from '@components/input/selector/SelectOptions.tsx';
import OptionButton from '@components/buttons/OptionButton.tsx';
import IconButton from '@components/buttons/IconButton.tsx';
import SearchAddress from '@components/forms/inputs/SearchAddress.tsx';

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

type Props = {
  theme: ColorTheme;
};

function ScheduleTravelForm({ theme }: Props) {
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
  const [currentOptionAddress, setCurrentOptionAddress] = useState<string>('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [returnHome, setReturnHome] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    console.log(currentAddress);
  }, [currentAddress]);

  useEffect(() => {
    console.log(currentOptionAddress);
  }, [currentOptionAddress]);

  const onSearch = async () => {};

  const CancelButton = () => {
    return <IconButton icon={TiCancel} theme={'gray'} />;
  };

  const LayoutInputContainer = ({ children }: React.PropsWithChildren) => {
    return (
      <div className={'flex justify-end items-end gap-2 flex-row'}>
        {children}
      </div>
    );
  };

  const AllAddress = () => {};

  const ConfigAddress = () => {
    const ChangeButton = () => {
      return (
        <IconButton
          icon={FaExchangeAlt}
          theme={theme}
          onClick={() => setReturnHome(!returnHome)}
        />
      );
    };

    return (
      <>
        <SelectOptions
          defaultValue={currentOptionIndex}
          options={defaultLocationList}
          onSelect={async (index: number) => {
            setCurrentOptionIndex(index);

            defaultLocationList.forEach(item => {
              if (item.id == index) {
                setCurrentOptionAddress(item.description);
              }
            });
          }}
        />

        <ChangeButton />
      </>
    );
  };

  const InputForms = () => {
    if (returnHome) {
      return (
        <>
          <LayoutInputContainer>
            <SearchAddress />
          </LayoutInputContainer>

          <LayoutInputContainer>
            <ConfigAddress />
          </LayoutInputContainer>
        </>
      );
    } else {
      return (
        <>
          <LayoutInputContainer>
            <ConfigAddress />
          </LayoutInputContainer>

          <LayoutInputContainer>
            <SearchAddress />
          </LayoutInputContainer>
        </>
      );
    }
  };

  return (
    <form className={'grow p-4 lg:h-screen flex flex-col justify-start gap-4'}>
      <div className={'grow flex flex-col gap-4'}>
        <InputForms />
      </div>

      <div className={'flex flex-row gap-4 items-center'}>
        <CancelButton />

        <OptionButton label={'Agendar'} theme={theme} />
      </div>
    </form>
  );
}

export default ScheduleTravelForm;
