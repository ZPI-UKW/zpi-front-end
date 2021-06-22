import { useQuery } from '@apollo/client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GET_USER_DATA } from '../graphql/user';
import { authDataNotExist } from './helpers';
import { ContextState, QueryData, UserData } from './types';

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

  const logout = useCallback(() => {
    setAuthState(userData);
    removeLocalStorageItem('userData');
    history.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isAuthenticated = () => {
    if (authDataNotExist(authState)) {
      removeLocalStorageItem('userData');
      return false;
    }
    return true;
  };

  const { loading, error, data } = useQuery<QueryData>(GET_USER_DATA);

  useEffect(() => {
    if (!loading) {
      if (data) setAuthInfo({ ...data.getUserData });
      else {
        logout();
      }
    }
  }, [loading, data, error, logout]);

  return (
    <Provider value={{ userInfo: authState, isAuthenticated, logout, setAuthInfo }}>
      {children}
    </Provider>
  );
};

export const useAuthContextState = () => useContext(AuthContext);
