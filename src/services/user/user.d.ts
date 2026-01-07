import type { UserRolEnum } from './user.enum';

export interface AuthUserProps {
  username: string;
  password: string;
}

export interface UserQueryProps {
  user: string;
}

export interface UserProps {
  _id: string;
  name: string;
  lastname: string;
  roles: Array<UserRolEnum>;
  username?: string;
  password?: string;
}
