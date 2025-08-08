import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../components/userContext/UserContext';

const AdminRoute = () => {
  const { user } = useUser();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return ['trainer', 'manager'].includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" />
  );
};

export default AdminRoute;
