import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { SchemeProvider } from '../../../store/SchemeContext';
import { SchemeTrainer } from '../../scheme/SchemeTrainer';

export function TrainingModal({ open, onClose }) {
  const [sessionKey, setSessionKey] = useState(0);

  const handleReset = useCallback(() => {
    setSessionKey((k) => k + 1);
  }, []);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle>Обучение — Построение и обработка схем</DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ mt: 0.5 }}>
          <SchemeProvider
            key={sessionKey}
            taskInfo={{
              title: 'Задание #67',
              description: 'Соберите простейшую электрическую схему',
            }}
          >
            <SchemeTrainer embedded />
          </SchemeProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReset} color="warning">
          Сбросить
        </Button>
        <Button onClick={onClose} variant="contained">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}
