import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks';

export function ProtectedRoute({ children, allowedRole }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    const redirectPath = user.role === 'instructor' ? '/instructor' : '/student';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}
