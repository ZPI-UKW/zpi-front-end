import { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authDataNotExist } from './helpers';
import { ContextState, UserData } from './types';

const userData: UserData = {
  _id: '',
  email: '',
  name: '',
  lastname: '',
  phonenumber: '',
};

const initialState: ContextState = {
  userInfo: {
    ...userData,
  },
  isAuthenticated: () => false,
  logout: () => {},
  setAuthInfo: () => {},
};

const AuthContext = createContext(initialState);

const { Provider } = AuthContext;

const setLocalStorageItem = (itemName: string, value: string) => {
  localStorage.setItem(itemName, value);
};

const removeLocalStorageItem = (itemName: string) => {
  localStorage.removeItem(itemName);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const history = useHistory();

  const storage = localStorage.getItem('userData');
  let userStorage: UserData;

  if (storage) userStorage = JSON.parse(storage) as UserData;
  else userStorage = userData;

  const [authState, setAuthState] = useState(userStorage);

  const setAuthInfo = (data: UserData) => {
    setAuthState({ ...data });
    setLocalStorageItem('userData', JSON.stringify(data));
  };

  const logout = () => {
    setAuthState(userData);
    removeLocalStorageItem('userData');
    history.push('/');
  };

  const isAuthenticated = () => {
    if (authDataNotExist(authState)) {
      removeLocalStorageItem('userData');
      return false;
    }
    return true;
  };

  return (
    <Provider value={{ userInfo: authState, isAuthenticated, logout, setAuthInfo }}>
      {children}
    </Provider>
  );
};

export const useAuthContextState = () => useContext(AuthContext);
