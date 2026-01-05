import sleep from 'utils/sleep';
import { UserRolEnum } from './user.enum';
import type { AuthUserProps, UserProps } from './user';

const defaultUser: UserProps = { _id: '1', email: 'main@mail.com', f_name: 'Name', l_name: 'Lastname', roles: [UserRolEnum.SUPERADMIN] };

export const authUser = async (body: AuthUserProps): Promise<UserProps> => {
  console.log(body);
  await sleep(1000);
  return defaultUser;
};

export const validateUser = async (): Promise<UserProps> => {
  await sleep(1500);
  return defaultUser;
};
