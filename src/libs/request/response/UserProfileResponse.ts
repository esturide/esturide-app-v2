interface UserProfileResponse {
  readonly code: number;
  readonly firstName: string;
  readonly maternalSurname: string;
  readonly paternalSurname: string;
  readonly birthDate: string;
  readonly phoneNumber: string;
  readonly email: string;
}

export default UserProfileResponse;
