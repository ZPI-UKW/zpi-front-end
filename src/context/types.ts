export interface UserData {
  _id: string;
  email: string;
  name: string;
  lastname: string;
  phonenumber: string;
}

export interface ContextState {
  userInfo: {
    [P in keyof UserData]: UserData[P];
  };
  isAuthenticated: () => boolean;
  logout: () => void;
  setAuthInfo: (data: UserData) => void;
}

export interface QueryData {
  getUserData: {
    _id: string;
    email: string;
    name: string;
    lastname: string;
    phonenumber: string;
    __typename: string;
  };
}
