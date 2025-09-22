import React from 'react';
import ColorTheme from '$libs/types/Theme.ts';
import IconButton from '@components/buttons/IconButton.tsx';
import HeaderText from '@components/text/HeaderText.tsx';
import TimePickerInput from '@components/input/TimePickerInput.tsx';
import UserInput from '@components/input/UserInput.tsx';
import ToggleInputList, {
  FilterOption,
} from '@components/input/list/ToggleInputList.tsx';
import PriceInput from '@components/input/PriceInput.tsx';
import SeatSelectorInput from '@components/input/selector/SeatSelectorInput.tsx';
import UserInputIcon from '@components/input/UserInputIcon.tsx';
import { CiCircleCheck, CiCircleRemove } from 'react-icons/ci';
import { TbCancel } from 'react-icons/tb';
import SmallButton from '@components/buttons/SmallButton.tsx';

export interface CurrentSchedule {
  addressFrom: string;
  addressTo: string;
}

type Props = {
  currentSchedule: CurrentSchedule;
  onCancel?: () => void;
  onSchedule?: (current: CurrentSchedule) => Promise<void>;
  theme?: ColorTheme;
};

function ScheduleTravelForm({
  currentSchedule,
  onSchedule,
  onCancel,
  theme = 'teal',
}: Props) {
  const CancelTravel = () => {
    return <IconButton icon={TbCancel} theme={'gray'} onClick={onCancel} />;
  };

  const AcceptPreviewTravel = () => {
    return <SmallButton label={'Planificar'} onClick={async () => {}} />;
  };

  const options: FilterOption[] = [
    {
      id: 'male',
      label: 'Hombre',
    },
    {
      id: 'female',
      label: 'Mujer',
    },
  ];

  return (
    <form className={'flex flex-col gap-6 px-2'}>
      <HeaderText title={'Ultimos detalles'} weight={1} />

      <div
        className={
          'flex flex-col md:flex-row gap-8 justify-between items-stretch'
        }
      >
        <div className={'flex flex-col gap-4 w-full'}>
          <div className={'flex flex-col gap-2 w-full'}>
            <HeaderText title={'Horario'} weight={2} />
            <TimePickerInput label={'Hora de salida'} />
            <UserInput type={'date'} label={'Fecha'} />
          </div>

          <div className={'flex flex-col gap-2 w-full'}>
            <HeaderText title={'Filtros'} weight={2} />

            <ToggleInputList
              options={options}
              title={'Selecciona'}
              onSelectionChange={selections => {
                console.log(selections);
              }}
            />
          </div>
        </div>

        <div className={'flex flex-col gap-2 w-full'}>
          <HeaderText title={'Configuracion'} weight={2} />

          <PriceInput
            label={'Precio por asiento'}
            placeholder={'Precio por asiento'}
          />

          <SeatSelectorInput
            labelButton={'Asignar'}
            onSelect={seats => {
              console.log('Selected seats:', seats);
            }}
          />
        </div>
      </div>

      <div>
        <HeaderText title={'Verifica ruta'} weight={2} />

        <UserInputIcon
          label={'Inicio'}
          value={currentSchedule.addressFrom}
          icon={CiCircleCheck}
          readOnly
          disabled
        />

        <UserInputIcon
          label={'Fin'}
          value={currentSchedule.addressTo}
          icon={CiCircleRemove}
          readOnly
          disabled
        />
      </div>

      <div className={'flex flex-row justify-between gap-2'}>
        <CancelTravel />
        <AcceptPreviewTravel />
      </div>
    </form>
  );
}

export default ScheduleTravelForm;
