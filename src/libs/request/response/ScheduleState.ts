import Seat from '$libs/types/Seats.ts';

interface ScheduleState {
  readonly maxPassengers: number;
  readonly seats: Seat[];
  readonly from: string;
  readonly to: string;
  readonly returnHome: boolean;
  readonly price: number;
}

export default ScheduleState;
