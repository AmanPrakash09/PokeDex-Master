import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const authorized = false
  return (
    authorized ? <Outlet /> : <Navigate to="/signin" />
  )
}

export default PrivateRoute;
