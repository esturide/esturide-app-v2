import LocationAddress from '$libs/types/LocationAddress.ts';
import Seat from '$libs/types/Seats.ts';

interface ScheduleState {
  readonly maxPassengers: number;
  readonly seats: Seat[];
  readonly from: LocationAddress;
  readonly to: LocationAddress;
  readonly returnHome: boolean;
  readonly price: number;
}

export default ScheduleState;
