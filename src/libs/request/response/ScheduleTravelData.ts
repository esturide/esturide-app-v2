import UserState from '$libs/request/response/UserState.ts';
import Seat from '$libs/types/Seats.ts';
import LocationAddress from '$libs/types/LocationAddress.ts';
import Gender from '$libs/types/Gender.ts';

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
  readonly origin: LocationAddress;
  readonly destination: LocationAddress;
  readonly rides: UserState[];
  readonly genderFilter: Gender[];
}

export default ScheduleTravelData;
