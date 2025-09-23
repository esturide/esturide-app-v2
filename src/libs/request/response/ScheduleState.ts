import Seat from '$libs/types/Seats.ts';
import Gender from '$libs/types/Gender.ts';

interface ScheduleState {
  readonly seats: Seat[];
  readonly origin: string;
  readonly destination: string;
  readonly returnHome: boolean;
  readonly price: number;
  readonly genderFilter: Gender[];
  readonly startDate: Date;
}

export default ScheduleState;
