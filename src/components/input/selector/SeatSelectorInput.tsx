import * as React from 'react';

import CarSelector from '@assets/images/car-selector.png';

interface SeatSelectorProps {
  seatId: string;
  label: string;
  isSelected: boolean;
  onToggle: (seatId: string) => void;
}

const SeatSelector: React.FC<SeatSelectorProps> = ({
  seatId,
  label,
  isSelected,
  onToggle,
}) => {
  return (
    <button
      className={
        'flex flex-row items-center justify-center pr-3 pl-2 w-14 h-14 bg-white border border-solid border-stone-300 min-h-14 rounded-[32px] focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2'
      }
      onClick={() => onToggle(seatId)}
      aria-label={`Seat ${label}, ${isSelected ? 'selected' : 'available'}`}
      aria-pressed={isSelected}
      role="checkbox"
      tabIndex={0}
    >
      <p className="text-base font-bold text-teal-900">{label}</p>
    </button>
  );
};

interface CarLayoutProps {
  selectedSeats: string[];
}

const CarLayoutResourceView: React.FC<CarLayoutProps> = ({ selectedSeats }) => {
  const isSeatSelected = (seatId: string) => selectedSeats.includes(seatId);

  return (
    <div>
      <section
        className="flex relative flex-col self-center px-9 py-2.5 mt-5 max-w-full text-base font-bold text-white whitespace-nowrap aspect-[2] w-[220px]"
        aria-label="Car seat layout visualization"
      >
        <img
          src={CarSelector}
          className="object-cover absolute inset-0 size-full"
          alt="Car interior layout"
        />

        <div className="flex relative gap-7 self-center mt-3.5 w-[89px]">
          <div
            className={`flex flex-col items-center px-2.5 pt-1.5 pb-3.5 rounded-lg h-[31px] w-[31px] ${
              isSeatSelected('C') ? 'bg-teal-600' : 'bg-teal-800'
            }`}
            aria-label={`Seat C ${isSeatSelected('C') ? 'selected' : 'available'}`}
          >
            <span>C</span>
          </div>
        </div>

        <div className="flex relative gap-7 self-center mt-3.5 w-[89px]">
          <div className="flex-1">
            <div
              className={`flex flex-col items-center px-2.5 pt-1.5 pb-3.5 rounded-lg h-[31px] w-[31px] ${
                isSeatSelected('B') ? 'bg-teal-600' : 'bg-teal-800'
              }`}
              aria-label={`Seat B ${isSeatSelected('B') ? 'selected' : 'available'}`}
            >
              <span>B</span>
            </div>
          </div>

          <div className="flex-1">
            <div
              className={`flex flex-col items-center px-2.5 pt-1.5 pb-3.5 rounded-lg h-[31px] w-[31px] ${
                isSeatSelected('A') ? 'bg-teal-600' : 'bg-teal-800'
              }`}
              aria-label={`Seat A ${isSeatSelected('A') ? 'selected' : 'available'}`}
            >
              <span>A</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface RouteButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const SelectRoute: React.FC<RouteButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`flex overflow-hidden gap-2.5 justify-center items-center self-center px-11 py-4 mt-11 w-full text-base font-bold text-white rounded-xl max-w-[302px] min-h-[51px] transition-colors focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 ${
        disabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-teal-700 hover:bg-teal-800 active:bg-teal-900'
      }`}
      onClick={onClick}
      disabled={disabled}
      aria-label="Choose route for selected seats"
    >
      <span className="self-stretch my-auto">Elegir Ruta</span>
    </button>
  );
};

function SeatSelectorInput() {
  const [selectedSeats, setSelectedSeats] = React.useState<string[]>(['B']);

  const handleSeatToggle = (seatId: string) => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId],
    );
  };

  const handleRouteSelection = () => {
    console.log('Selected seats:', selectedSeats);
  };

  return (
    <div
      className="overflow-hidden bg-white max-w-[480px]"
      aria-label="Driver journey seat selection"
    >
      <header className="overflow-hidden w-full bg-gray-900">
        <div className="w-full text-lg font-semibold tracking-tight leading-none text-center text-white whitespace-nowrap" />
        <div className="w-full">
          <div className="overflow-hidden px-4 w-full" />
        </div>
      </header>

      <div className="flex flex-col justify-center items-center px-6 mt-5 w-full">
        <div className="flex gap-6" />

        <section aria-labelledby="available-seats-heading">
          <h1
            id="available-seats-heading"
            className="mt-6 ml-6 text-base font-bold text-teal-900"
          >
            Asientos Disponibles
          </h1>

          <div className="flex gap-8 self-center mt-4 max-w-full text-base font-bold text-teal-900 whitespace-nowrap w-[230px]">
            <SeatSelector
              seatId="A"
              label="A"
              isSelected={selectedSeats.includes('A')}
              onToggle={handleSeatToggle}
            />

            <SeatSelector
              seatId="B"
              label="B"
              isSelected={selectedSeats.includes('B')}
              onToggle={handleSeatToggle}
            />
            <SeatSelector
              seatId="C"
              label="C"
              isSelected={selectedSeats.includes('C')}
              onToggle={handleSeatToggle}
            />
          </div>
        </section>

        {/* Car layout visualization */}
        <CarLayoutResourceView selectedSeats={selectedSeats} />

        {/* Route selection button */}
        <SelectRoute
          onClick={handleRouteSelection}
          disabled={selectedSeats.length === 0}
        />
      </div>
    </div>
  );
}

export default SeatSelectorInput;
