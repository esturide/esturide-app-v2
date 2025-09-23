import React, { useEffect, useRef, useState } from 'react';
import ColorTheme from '$libs/types/Theme.ts';
import IconButton from '@components/buttons/IconButton.tsx';
import HeaderText from '@components/text/HeaderText.tsx';
import ToggleInputList from '@components/input/list/ToggleInputList.tsx';
import PriceInput from '@components/input/PriceInput.tsx';
import SeatSelectorInput from '@components/input/selector/SeatSelectorInput.tsx';
import UserInputIcon from '@components/input/UserInputIcon.tsx';
import { CiCircleCheck, CiCircleRemove } from 'react-icons/ci';
import { TbCancel } from 'react-icons/tb';
import SmallButton from '@components/buttons/SmallButton.tsx';
import { LocationState } from '@/context/ScheduleTravelContext.tsx';
import DateTimePickerInput from '@components/input/DateTimePickerInput.tsx';
import { MdOutlineAlarmOn } from 'react-icons/md';
import { failureMessage } from '$libs/toast/failure.ts';
import Seat from '$libs/types/Seats.ts';

interface GenderOptionFilter {
  female: boolean;
  male: boolean;
}

export interface CurrentSchedule {
  addressFrom: string;
  addressTo: string;
  dateTime: Date;
  genderFilter: GenderOptionFilter;
  price: number;
  seats: Seat[];
}

type Props = {
  currentSchedule: LocationState;
  onCancel?: () => void;
  onSchedule?: (current: CurrentSchedule) => Promise<void>;
  theme?: ColorTheme;
};

const defaultMinimumPrice = 1;

function ScheduleTravelForm({ currentSchedule, onSchedule, onCancel }: Props) {
  const [scheduleDateTime, setScheduleDateTime] = useState<Date | null>(null);

  const scheduleTravelDataRef = useRef<CurrentSchedule>({
    addressFrom: '',
    addressTo: '',
    dateTime: new Date(),
    genderFilter: {
      male: false,
      female: false,
    },
    price: defaultMinimumPrice,
    seats: [],
  });

  const onScheduleSubmit = async () => {
    console.log(scheduleTravelDataRef.current);

    if (onSchedule) {
      await onSchedule(scheduleTravelDataRef.current);
    }
  };

  const ScheduleDateTime = () => {
    const defaultToleranceMinutes = 3;

    const [isValidScheduleDateTime, setIsValidScheduleDateTime] =
      useState(true);

    useEffect(() => {
      const now = new Date();

      if (scheduleDateTime) {
        setIsValidScheduleDateTime(scheduleDateTime.getTime() >= now.getTime());

        if (isValidScheduleDateTime) {
          scheduleTravelDataRef.current.dateTime = scheduleDateTime;
        }

        console.log(scheduleDateTime);
      } else {
        setIsValidScheduleDateTime(true);
      }
    }, [isValidScheduleDateTime]);

    useEffect(() => {
      if (!isValidScheduleDateTime) {
        failureMessage('Horario de planificacion incorrecto.');
      }
    }, [isValidScheduleDateTime]);

    return (
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
    );
  };

  const FilterGender = () => {
    const filterOptionsSelected = [
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
      <div className={'flex flex-col gap-2 w-full'}>
        <HeaderText title={'Filtros'} weight={2} />

        <ToggleInputList
          options={filterOptionsSelected}
          title={'Selecciona'}
          onSelectionChange={options => {
            scheduleTravelDataRef.current.genderFilter = {
              male: options.male,
              female: options.female,
            };
          }}
        />
      </div>
    );
  };

  const ConfigureFilterSchedule = () => {
    return (
      <div className={'flex flex-col gap-2 w-full'}>
        <ScheduleDateTime />
        <FilterGender />
      </div>
    );
  };

  const ConfigureRulesSchedule = () => {
    return (
      <div className={'flex flex-col gap-2 w-full'}>
        <HeaderText title={'Configuracion de asientos'} weight={2} />

        <PriceInput
          label={'Precio por asiento'}
          placeholder={'Precio por asiento'}
          min={defaultMinimumPrice}
          max={100}
          onChange={value => {
            scheduleTravelDataRef.current.price = value;
          }}
        />

        <SeatSelectorInput
          onChange={seats => {
            scheduleTravelDataRef.current.seats = seats;
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
    <div className={'flex flex-col gap-4 px-2'}>
      <HeaderText title={'Ultimos detalles'} weight={1} />

      <div
        className={
          'flex flex-col md:flex-row gap-8 justify-between items-stretch'
        }
      >
        <ConfigureFilterSchedule />

        <ConfigureRulesSchedule />
      </div>

      <CheckSchedule />

      <ScheduleConfirm />
    </div>
  );
}

export default ScheduleTravelForm;
