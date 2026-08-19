import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api';
import { useAppDispatch } from '../store/hooks';
import { setCredentials } from '../store/slices/authSlice';

export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(
    async (userId) => {
      setLoading(true);
      setError(null);

      try {
        const response = await authApi.login({ userId });
        dispatch(setCredentials({ user: response.user, token: response.token }));

        if (response.user.role === 'instructor') {
          navigate('/instructor');
        } else {
          navigate('/student');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка входа');
      } finally {
        setLoading(false);
      }
    },
    [dispatch, navigate],
  );

  return { login, loading, error };
}
