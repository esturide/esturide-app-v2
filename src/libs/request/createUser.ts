interface UserForm {
  code: number;
  firstName: string;
  maternalSurname: string;
  paternalSurname: string;
  curp: string;
  birth: Date;
  email: string;
  password: string;
}

export const createUser = async (user: UserForm) => {
  console.log(JSON.stringify(user));

  return false;
};
