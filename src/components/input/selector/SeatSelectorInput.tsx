import React, { useEffect, useState } from 'react';
import CarSelector from '@assets/images/car-selector.png';
import Seat from '$libs/types/Seats.ts';
import ColorTheme from '$libs/types/Theme.ts';

type CarLayoutProps = {
  selectedSeats: string[];
};

const CarLayoutResourceView: React.FC<CarLayoutProps> = ({ selectedSeats }) => {
  const isSeatSelected = (seatId: string) => selectedSeats.includes(seatId);

  type SeatSelectedProps = {
    seat: Seat;
  };

  const SeatSelected: React.FC<SeatSelectedProps> = ({ seat }) => {
    return (
      <div
        className={`flex flex-row items-center justify-center rounded-lg h-[31px] w-[31px] ${
          isSeatSelected(seat) ? 'bg-teal-600' : 'bg-teal-800'
        }`}
        aria-label={`Seat ${seat} ${isSeatSelected(seat) ? 'selected' : 'available'}`}
      >
        <p className={'text-base font-bold text-white'}>{seat}</p>
      </div>
    );
  };

  return (
    <div>
      <section
        className="flex relative flex-col self-center max-w-full text-base font-bold text-white whitespace-nowrap aspect-[2] w-[220px]"
        aria-label="Car seat layout visualization"
      >
        <img
          src={CarSelector}
          className="object-cover absolute inset-0 size-full"
          alt="Car interior layout"
        />

        <div className="flex relative gap-7 self-center mt-3.5 w-[89px]">
          <SeatSelected seat={'C'} />
        </div>

        <div className="flex relative gap-7 self-center mt-3.5 w-[89px]">
          <div className="flex-1">
            <SeatSelected seat={'B'} />
          </div>

          <div className="flex-1">
            <SeatSelected seat={'A'} />
          </div>
        </div>
      </section>
    </div>
  );
};

type SeatSelectorProps = {
  seatId: Seat;
  label: string;
  isSelected: boolean;
  onToggle: (seatId: Seat) => void;
  theme?: ColorTheme;
};

const SeatSelector: React.FC<SeatSelectorProps> = ({
  seatId,
  label,
  isSelected,
  onToggle,
  theme = 'teal',
}) => {
  const allStyles = {
    teal: 'flex flex-row items-center justify-center w-14 h-14 bg-white border border-solid border-stone-300 min-h-14 rounded-[32px] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2',
    indigo:
      "'flex flex-row items-center justify-center w-14 h-14 bg-white border border-solid border-stone-300 min-h-14 rounded-[32px] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2",
    gray: "'flex flex-row items-center justify-center w-14 h-14 bg-white border border-solid border-stone-300 min-h-14 rounded-[32px] focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2",
  };

  const allStyleFocus = {
    teal: 'flex flex-row items-center justify-center w-14 h-14 bg-white border border-solid border-stone-300 min-h-14 rounded-[32px] ring-2 ring-teal-600 ring-offset',
    indigo:
      'flex flex-row items-center justify-center w-14 h-14 bg-white border border-solid border-stone-300 min-h-14 rounded-[32px] ring-2 ring-indigo-600 ring-offset',
    gray: 'flex flex-row items-center justify-center w-14 h-14 bg-white border border-solid border-stone-300 min-h-14 rounded-[32px] ring-2 ring-gray-600 ring-offset',
  };

  return (
    <button
      className={isSelected ? allStyleFocus[theme] : allStyles[theme]}
      onClick={() => onToggle(seatId)}
      role="checkbox"
      tabIndex={0}
    >
      <p className="text-base font-bold text-teal-900">{label}</p>
    </button>
  );
};

type Props = {
  label?: string;
  onSelect?: (seats: Seat[]) => void;
  labelButton?: string;
  theme?: ColorTheme;
  valid?: boolean;
  showButton?: boolean;
  onChange?: (seats: Seat[]) => void;
};

function SeatSelectorInput({
  label,
  onSelect,
  labelButton,
  theme = 'teal',
  valid = true,
  showButton = false,
  onChange,
}: Props) {
  const defaultAllSeats: Seat[] = ['A', 'B', 'C'] as const;
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const allTextThemeColors = {
    gray: 'my-2 mx-2 text-left text-sm font-medium text-gray-900',
    teal: 'my-2 mx-2 text-left text-sm font-medium text-teal-900',
    indigo: 'my-2 mx-2 text-left text-sm font-medium text-indigo-900',
  };

  const allInputThemeColors = {
    gray: `px-4 py-2 w-full text-base font-medium tracking-normal text-left text-black bg-white border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent rounded-t-[40px] rounded-b-[40px] ${valid ? 'border-solid border-stone-300' : 'border-solid border-red-500 ring-2 ring-red-500'}`,
    teal: `px-4 py-2 w-full text-base font-medium tracking-normal text-left text-black bg-white border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent rounded-t-[40px] rounded-b-[40px] ${valid ? 'border-solid border-stone-300' : 'border-solid border-red-500 ring-2 ring-red-500'}`,
    indigo: `px-4 py-2 w-full text-base font-medium tracking-normal text-left text-black bg-white border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-t-[40px] rounded-b-[40px] ${valid ? 'border-solid border-stone-300' : 'border-solid border-red-500 ring-2 ring-red-500'}`,
  };

  useEffect(() => {
    if (onChange) {
      onChange(selectedSeats);
    }
  }, [selectedSeats]);

  type RouteButtonProps = {
    onClick: () => void;
    disabled?: boolean;
  };

  const SelectRoute: React.FC<RouteButtonProps> = ({
    onClick,
    disabled = false,
  }) => {
    return (
      <button
        type="button"
        className={`flex overflow-hidden gap-2.5 justify-center items-center self-center w-full text-base font-bold text-white rounded-xl max-w-[302px] min-h-[51px] transition-colors focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 ${
          disabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-teal-700 hover:bg-teal-800 active:bg-teal-900'
        }`}
        onClick={onClick}
        disabled={disabled}
        aria-label="Choose route for selected seats"
      >
        <span className="self-stretch my-auto">
          {labelButton ? labelButton : 'Seleccionar'}
        </span>
      </button>
    );
  };

  const handleSeatToggle = (seatId: Seat) => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId],
    );
  };

  const handleRouteSelection = () => {
    if (onSelect) {
      onSelect(selectedSeats as Seat[]);
    }
  };

  return (
    <div className="w-full" aria-label="Driver journey seat selection">
      {label && <label className={allTextThemeColors[theme]}>{label}</label>}

      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <div className="flex flex-col gap-2 justify-center items-center w-full">
          <CarLayoutResourceView selectedSeats={selectedSeats} />

          <div className="flex flex-row gap-8 self-center max-w-full text-base font-bold text-teal-900 whitespace-nowrap w-[230px]">
            {defaultAllSeats.map(seat => (
              <SeatSelector
                seatId={seat}
                label={seat}
                isSelected={selectedSeats.includes(seat)}
                onToggle={handleSeatToggle}
              />
            ))}
          </div>
        </div>

        {showButton && (
          <SelectRoute
            onClick={handleRouteSelection}
            disabled={selectedSeats.length === 0}
          />
        )}
      </div>
    </div>
  );
}

export default SeatSelectorInput;
