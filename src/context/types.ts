export interface UserData {
  email: string;
  name: string;
  surname: string;
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
