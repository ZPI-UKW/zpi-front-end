import { UserData } from './types';

export const authDataNotExist = (authState: UserData) =>
  !authState._id ||
  !authState.email ||
  !authState.name ||
  !authState.lastname ||
  !authState.phonenumber;
