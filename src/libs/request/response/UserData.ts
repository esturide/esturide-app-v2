import UserRole from '$libs/types/UserRole.ts';

interface UserData {
  readonly code: number;
  readonly firstName: string;
  readonly maternalSurname: string;
  readonly paternalSurname: string;
  readonly email: string;
  readonly role: UserRole;
}

export default UserData;
