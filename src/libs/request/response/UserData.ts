import Location from '$libs/types/Location.ts';

interface UserData {
  readonly code: number;
  readonly firstName: string;
  readonly maternalSurname: string;
  readonly paternalSurname: string;
  readonly position: Location;
}

export default UserData;
