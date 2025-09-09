import React from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import IconButton from '@components/buttons/IconButton.tsx';
import ColorTheme from '$libs/types/Theme.ts';
import SelectOptions, {
  StringOption,
} from '@components/input/selector/SelectOptions.tsx';

type Props = {
  theme: ColorTheme;
  label?: string;
  onSwap?: () => void;
  onSelect?: (option: number) => void;
  select?: number;
  defaultLocationList: StringOption[];
};

function ConfigAddress({
  theme,
  label,
  onSwap,
  onSelect,
  select,
  defaultLocationList,
}: Props) {
  const ChangeButton = () => {
    return <IconButton icon={FaExchangeAlt} theme={theme} onClick={onSwap} />;
  };

  return (
    <>
      <SelectOptions
        label={label}
        options={defaultLocationList}
        name={'selected-address'}
        onSelect={onSelect}
        defaultValue={select}
      />

      <ChangeButton />
    </>
  );
}

export default ConfigAddress;
