import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { getUser } from '../../store/slice/user.slice';

export default function PrivateRoutes() {
  const { isAuth } = useAppSelector(getUser);

  return isAuth ? <Navigate to="/" /> : <Outlet />;
}
