import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { SchemeProvider } from '../../../store/SchemeContext';
import { SchemeTrainer } from '../../scheme/SchemeTrainer';

export function ExamModal({ open, onClose }) {
  const [sessionKey, setSessionKey] = useState(0);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle>Экзамен — Итоговая аттестация</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Выполните экзаменационное задание по построению схемы. Время ограничено
          (таймер в разработке).
        </Typography>
        <SchemeProvider
          key={sessionKey}
          taskInfo={{
            title: 'Экзамен — Задание #3',
            description: 'Соберите полную измерительную схему с амперметром и вольтметром',
          }}
        >
          <SchemeTrainer embedded />
        </SchemeProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setSessionKey((k) => k + 1)} color="warning">
          Сбросить
        </Button>
        <Button onClick={onClose} variant="contained">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}
