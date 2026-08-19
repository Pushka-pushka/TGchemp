import { Paper, Typography } from '@mui/material';
import { TRAINING_TASK_TEXT } from '../../constants/schemeElements';

export function TaskSector() {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        bgcolor: 'info.50',
        borderLeft: 4,
        borderColor: 'info.main',
      }}
    >
      <Typography variant="subtitle2" color="info.main" gutterBottom>
        Сектор 1 — Задание
      </Typography>
      <Typography variant="body2">{TRAINING_TASK_TEXT}</Typography>
    </Paper>
  );
}
