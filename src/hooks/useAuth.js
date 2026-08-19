import { useAppSelector } from '../store/hooks';

export function useAuth() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  return { user, isAuthenticated };
}
