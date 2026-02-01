import UserRole from '$libs/types/UserRole.ts';

interface UserResponse {
  readonly code: number;
  readonly firstName: string;
  readonly maternalSurname: string;
  readonly paternalSurname: string;
  readonly email: string;
  readonly role: UserRole;
}

export default UserResponse;
