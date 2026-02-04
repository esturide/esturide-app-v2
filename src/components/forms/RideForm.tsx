import React, { useEffect, useRef, useState } from 'react';
import UserInputIcon from '@components/input/UserInputIcon.tsx';
import {
  FaBackspace,
  FaCarSide,
  FaExchangeAlt,
  FaFlagCheckered,
  FaHome,
} from 'react-icons/fa';
import MediumButton from '@components/buttons/MediumButton.tsx';
import IconButton from '@components/buttons/IconButton.tsx';
import SelectOptions from '@components/input/selector/SelectOptions.tsx';
import ColorTheme from '$libs/types/Theme.ts';
import defaultLocationList, {
  searchCurrentItem,
} from '$libs/const/defaultLocations.ts';
import LineElementList, {
  LineItem,
} from '@components/resources/LineElementList.tsx';
import MainResponsiveLayout from '@layouts/view/MainResponsiveLayout.tsx';
import TravelMessage from '@components/resources/message/TravelMessage.tsx';
import { useNavigate } from 'react-router-dom';
import { failureMessage } from '$libs/toast/failure.ts';
import HeaderText from '@components/text/HeaderText.tsx';
import DateTimePickerInput from '@components/input/DateTimePickerInput.tsx';
import { MdOutlineAlarmOn } from 'react-icons/md';

type Props = {
  theme: ColorTheme;
  onSwap?: (state: boolean) => void;
  onSearchRequest?: (addressFrom: string, addressTo: string) => Promise<void>;
  onCancel?: () => void;
  homeAddress?: string;
};

export interface RideTravelInput {
  addressFrom: string;
  addressTo: string;
  dateTime: Date;
}

function RideForm({
  theme,
  onSwap,
  onSearchRequest,
  onCancel,
  homeAddress,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addressOption, setAddressOption] = useState('');
  const [swapTravelStatus, setSwapTravelStatus] = useState(false);

  const scheduleTravelDataRef = useRef<RideTravelInput>({
    addressFrom: '',
    addressTo: '',
    dateTime: new Date(),
  });

  useEffect(() => {
    if (onSwap) {
      onSwap(swapTravelStatus);
    }
  }, [swapTravelStatus]);

  const ScheduleDateTime = () => {
    const defaultToleranceMinutes = 3;

    const [scheduleDateTime, setScheduleDateTime] = useState<Date | null>(null);
    const [isValidScheduleDateTime, setIsValidScheduleDateTime] =
      useState(true);

    useEffect(() => {
      const now = new Date();

      if (scheduleDateTime) {
        setIsValidScheduleDateTime(scheduleDateTime.getTime() >= now.getTime());

        if (!isValidScheduleDateTime) {
          failureMessage('Horario de planificacion incorrecto.');
        }

        if (isValidScheduleDateTime) {
          scheduleTravelDataRef.current.dateTime = scheduleDateTime;
        }
      } else {
        setIsValidScheduleDateTime(true);
      }
    }, [isValidScheduleDateTime, scheduleDateTime]);

    return (
      <div className={'flex flex-col gap-2 w-full'}>
        <HeaderText title={'Hora de salida'} weight={2} />

        <div className={'flex flex-col justify-start'}>
          <div className={'flex flex-row items-end gap-2 w-full'}>
            <DateTimePickerInput
              label={'Horario de salida'}
              value={scheduleDateTime}
              onInput={setScheduleDateTime}
              theme={'indigo'}
            />

            <IconButton
              icon={MdOutlineAlarmOn}
              onClick={() => {
                const now = new Date();
                now.setMinutes(now.getMinutes() + defaultToleranceMinutes);

                setScheduleDateTime(now);
              }}
              theme={'indigo'}
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

  const ChangeButton = () => {
    return (
      <IconButton
        icon={FaExchangeAlt}
        theme={theme}
        onClick={() => {
          setSwapTravelStatus(!swapTravelStatus);
        }}
      />
    );
  };

  const CancelButton = () => {
    return <IconButton icon={FaBackspace} theme={'gray'} onClick={onCancel} />;
  };

  const HomeAddress = () => {
    return (
      <UserInputIcon icon={FaHome} theme={theme} value={'Casa'} readOnly />
    );
  };

  const SelectAddress = () => {
    useEffect(() => {
      const item = searchCurrentItem(currentIndex);

      if (item !== undefined) {
        setAddressOption(item.description);
      }
    }, [currentIndex]);

    return (
      <SelectOptions
        options={defaultLocationList}
        theme={theme}
        defaultValue={currentIndex}
        onSelect={setCurrentIndex}
      />
    );
  };

  const onSearchClick = async () => {
    if (!onSearchRequest) {
      return;
    }

    if (!homeAddress) {
      return;
    }

    if (swapTravelStatus) {
      await onSearchRequest(addressOption, homeAddress);
    } else {
      await onSearchRequest(homeAddress, addressOption);
    }
  };

  const TravelOptions = () => {
    const FromHome = () => {
      const elements: LineItem[] = [
        {
          title: 'Recogida',
          icon: FaCarSide,
          item: () => <SelectAddress />,
        },
        {
          title: 'Destino',
          icon: FaFlagCheckered,
          item: () => (
            <div className={'flex flex-row gap-2 items-center justify-center'}>
              <HomeAddress />
              <ChangeButton />
            </div>
          ),
        },
      ];

      return <LineElementList elements={elements} />;
    };

    const ReturnHome = () => {
      const elements: LineItem[] = [
        {
          title: 'Recogida',
          icon: FaCarSide,
          item: () => <HomeAddress />,
        },
        {
          title: 'Destino',
          icon: FaFlagCheckered,
          item: () => (
            <div className={'flex flex-row gap-2 items-center justify-center'}>
              <SelectAddress />
              <ChangeButton />
            </div>
          ),
        },
      ];

      return <LineElementList elements={elements} />;
    };

    if (swapTravelStatus) {
      return (
        <>
          <FromHome />
        </>
      );
    } else {
      return (
        <>
          <ReturnHome />
        </>
      );
    }
  };

  return (
    <form className={'grow flex flex-col justify-start gap-4 sm:gap-8'}>
      <div
        className={
          'flex flex-col gap-6 px-6 py-4 sm:py-6 rounded-3xl border border-stone-300'
        }
      >
        <TravelOptions />
        <ScheduleDateTime />
      </div>

      <div className={'flex flex-row gap-2 items-center justify-center'}>
        <CancelButton />
        <MediumButton label={'Buscar'} theme={theme} onClick={onSearchClick} />
      </div>
    </form>
  );
}

export default RideForm;
