import { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
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

  const [authState, setAuthState] = useState(userData);

  const setAuthInfo = (data: UserData) => {
    setAuthState({ ...data });
    Object.entries(data).forEach((el) => setLocalStorageItem(el[0], el[1] || ''));
  };

  const logout = () => {
    setAuthState(userData);
    Object.keys(authState).forEach((el) => removeLocalStorageItem(el[0]));
    history.push('/');
  };

  const isAuthenticated = () => {
    if (!authState.email || !authState.name || !authState.lastname || !authState.phonenumber) {
      Object.keys(authState).forEach((el) => removeLocalStorageItem(el[0]));
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
