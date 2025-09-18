import UserState from '$libs/request/response/UserState.ts';
import Seat from '$libs/types/Seats.ts';
import Location from '$libs/types/Location.ts';

interface ScheduleTravelData {
  readonly uuid: string;
  readonly driver: UserState;
  readonly price: number;
  readonly terminate: boolean;
  readonly cancel: boolean;
  readonly starting?: string;
  readonly terminated?: string;
  readonly maxPassengers: number;
  readonly seats: Seat[];
  readonly origin: Location;
  readonly destination: Location;
  readonly rides: UserState[];
}

export default ScheduleTravelData;
