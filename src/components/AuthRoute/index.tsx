import { Redirect, Route } from 'react-router';
import { useAuthContextState } from '../../context/authContext';
import { AuthRouteProps } from './types';

const AuthRoute = ({ children, ...props }: AuthRouteProps) => {
  const { isAuthenticated } = useAuthContextState();

  return <Route {...props}>{isAuthenticated() ? children : <Redirect to="/" />}</Route>;
};

export default AuthRoute;
