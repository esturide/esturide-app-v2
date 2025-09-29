import Seat from '$libs/types/Seats.ts';
import LocationAddress from '$libs/types/LocationAddress.ts';
import Gender from '$libs/types/Gender.ts';
import RideInterface from '$libs/types/interface/RideInterface.ts';
import UserInterface from '$libs/types/interface/UserInterface.ts';

interface ScheduleTravelInterface {
  readonly uuid: string;
  readonly driver: UserInterface;
  readonly price: number;
  readonly terminate: boolean;
  readonly cancel: boolean;
  readonly starting?: string;
  readonly terminated?: string;
  readonly maxPassengers: number;
  readonly seats: Seat[];
  readonly origin: LocationAddress;
  readonly destination: LocationAddress;
  readonly rides: RideInterface[];
  readonly genderFilter: Gender[];
}

export default ScheduleTravelInterface;
