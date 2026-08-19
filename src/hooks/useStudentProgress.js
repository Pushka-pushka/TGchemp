import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchStudentProgress } from '../store/slices/progressSlice';

export function useStudentProgress() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.progress);

  useEffect(() => {
    dispatch(fetchStudentProgress());
  }, [dispatch]);

  return { progress: items, loading, error };
}
