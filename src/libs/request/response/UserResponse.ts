import Location from '$libs/types/Location.ts';

interface UserResponse {
  readonly code: number;
  readonly firstName: string;
  readonly maternalSurname: string;
  readonly paternalSurname: string;
  readonly position: Location;
}

export default UserResponse;
