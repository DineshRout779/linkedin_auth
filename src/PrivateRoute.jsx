import { Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { state } = useAuth();

  return state.user ? children : <Navigate to='/' />;
};

export default PrivateRoute;
