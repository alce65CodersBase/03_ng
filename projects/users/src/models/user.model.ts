export type UserLogin = {
  email: string;
  passwd: string;
};

export type UserRegister = UserLogin & {
  firstName: string;
  surname: string;
};

export type UserLogged = {
  id: string;
} & UserRegister;

export type User = {
  id: number;
  firstName: string;
  surname: string;
  isAdmin: boolean;
};
