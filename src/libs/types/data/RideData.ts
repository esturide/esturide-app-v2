import Seat from '$libs/types/Seats.ts';
import UserData from '$libs/types/data/UserData.ts';

interface RideData {
  readonly accept: boolean;
  readonly cancel: boolean;
  readonly over: boolean;
  readonly passenger: UserData;
  readonly seat: Seat;
  readonly uuid: string;
}

export default RideData;
