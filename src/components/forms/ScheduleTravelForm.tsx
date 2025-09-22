import React, { useEffect, useState } from 'react';
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
import {
  CiAlarmOn,
  CiCircleCheck,
  CiCircleRemove,
  CiTimer,
} from 'react-icons/ci';
import { TbCancel } from 'react-icons/tb';
import SmallButton from '@components/buttons/SmallButton.tsx';
import { LocationState } from '@/context/ScheduleTravelContext.tsx';
import userInput from '@components/input/UserInput.tsx';
import DateTimePickerInput from '@components/input/DateTimePickerInput.tsx';
import MediumButton from '@components/buttons/MediumButton.tsx';
import { MdOutlineAlarmOn } from 'react-icons/md';
import { failureMessage } from '$libs/toast/failure.ts';

export interface CurrentSchedule {
  addressFrom: string;
  addressTo: string;
}

type Props = {
  currentSchedule: LocationState;
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
  const [scheduleDateTime, setScheduleDateTime] = useState<Date | null>(null);

  useEffect(() => {
    console.log(scheduleDateTime);
  }, [scheduleDateTime]);

  const onScheduleSubmit = async () => {
    console.log('Schedule Submitted');

    console.log(scheduleDateTime);
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

  const ConfigureScheduleDateTime = () => {
    const defaultToleranceMinutes = 3;
    const [isValidScheduleDateTime, setIsValidScheduleDateTime] =
      useState(true);

    useEffect(() => {
      const now = new Date();

      if (scheduleDateTime) {
        setIsValidScheduleDateTime(scheduleDateTime.getTime() >= now.getTime());
      } else {
        setIsValidScheduleDateTime(true);
      }
    }, [scheduleDateTime]);

    useEffect(() => {
      if (!isValidScheduleDateTime) {
        failureMessage('Horario de planificacion incorrecto.');
      }
    }, [isValidScheduleDateTime]);

    return (
      <div className={'flex flex-col items-stretch gap-4 h-full w-full'}>
        <div className={'flex flex-col gap-2 w-full'}>
          <HeaderText title={'Planificar'} weight={2} />

          <div className={'flex flex-col justify-start'}>
            <div className={'flex flex-row items-end gap-2 w-full'}>
              <DateTimePickerInput
                label={'Horario de salida'}
                value={scheduleDateTime}
                onInput={setScheduleDateTime}
              />

              <IconButton
                icon={MdOutlineAlarmOn}
                onClick={() => {
                  const now = new Date();
                  now.setMinutes(now.getMinutes() + defaultToleranceMinutes);

                  setScheduleDateTime(now);
                }}
              />
            </div>

            {!isValidScheduleDateTime && (
              <p className={'px-3 pt-1 text-xs text-red-500 text-left'}>
                No se puede programar el viaje a esta hora.
              </p>
            )}
          </div>
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
    );
  };

  const ConfigureRulesSchedule = () => {
    return (
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
    );
  };

  const CheckSchedule = () => {
    return (
      <div className={'flex flex-col gap-2'}>
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
    );
  };

  const ScheduleConfirm = () => {
    const CancelTravel = () => {
      return <IconButton icon={TbCancel} theme={'gray'} onClick={onCancel} />;
    };

    const AcceptPreviewTravel = () => {
      return <SmallButton label={'Planificar'} onClick={onScheduleSubmit} />;
    };

    return (
      <div className={'flex flex-row justify-between gap-2'}>
        <CancelTravel />
        <AcceptPreviewTravel />
      </div>
    );
  };

  return (
    <form className={'flex flex-col gap-4 px-2'}>
      <HeaderText title={'Ultimos detalles'} weight={1} />

      <div
        className={
          'flex flex-col md:flex-row gap-8 justify-between items-stretch'
        }
      >
        <ConfigureScheduleDateTime />

        <ConfigureRulesSchedule />
      </div>

      <CheckSchedule />

      <ScheduleConfirm />
    </form>
  );
}

export default ScheduleTravelForm;
