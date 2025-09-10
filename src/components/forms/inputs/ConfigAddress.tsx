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
  name?: string;
  defaultLocationList: StringOption[];
};

function ConfigAddress({
  theme,
  label,
  name = 'selected-address',
  defaultLocationList,
}: Props) {
  const ChangeButton = () => {
    return <IconButton icon={FaExchangeAlt} theme={theme} />;
  };

  return (
    <>
      <SelectOptions label={label} options={defaultLocationList} name={name} />

      <ChangeButton />
    </>
  );
}

export default ConfigAddress;
