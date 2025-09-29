import Seat from '$libs/types/Seats.ts';
import UserInterface from '$libs/types/interface/UserInterface.ts';

interface RideInterface {
  readonly accept: boolean;
  readonly cancel: boolean;
  readonly over: boolean;
  readonly passenger: UserInterface;
  readonly seat: Seat;
  readonly uuid: string;
}

export default RideInterface;
