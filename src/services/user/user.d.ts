import type { UserRolEnum } from './user.enum';

export interface AuthUserProps {
  username: string;
  password: string;
}

export interface UserProps {
  _id: string;
  // box: string;
  f_name: string;
  l_name: string;
  email: string;
  // password: string;
  roles: Array<UserRolEnum>;
  address?: string;
  phone?: number;
  username?: string;
  t_doc?: string;
  n_doc?: string;
  profile_picture?: string;
  // campus: any;
  // occupation?: string;
  // dateBorn?: string;
  // direccion?: string;
  // fullname?: string;
}
