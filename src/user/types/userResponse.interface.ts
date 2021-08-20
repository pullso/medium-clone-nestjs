import { UserType } from './user.type';

export interface UserResponseInterface {
  user: { token: string } & UserType;
}
