import UserResponse from '$libs/request/response/UserResponse.ts';
import Seat from '$libs/types/Seats.ts';
import Location from '$libs/types/Location.ts';

interface ScheduleResponse {
  readonly uuid: string;
  readonly driver: UserResponse;
  readonly price: number;
  readonly terminate: boolean;
  readonly cancel: boolean;
  readonly starting?: string;
  readonly terminated?: string;
  readonly maxPassengers: number;
  readonly seats: Seat[];
  readonly origin: Location;
  readonly destination: Location;
  readonly rides: UserResponse[];
}

export default ScheduleResponse;
