import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useStudentProgress } from '../../hooks';

const STATUS_LABELS = {
  not_started: 'Не начато',
  in_progress: 'В процессе',
  completed: 'Завершено',
};

const STATUS_COLORS = {
  not_started: 'default',
  in_progress: 'warning',
  completed: 'success',
};

function StatusChip({ status }) {
  return (
    <Chip
      label={STATUS_LABELS[status]}
      color={STATUS_COLORS[status]}
      size="small"
    />
  );
}

function ScoreCell({ score }) {
  return score !== null ? `${score}%` : '—';
}

export function ProgressTable() {
  const { progress, loading, error } = useStudentProgress();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID ученика</TableCell>
            <TableCell>ФИО</TableCell>
            <TableCell align="center">Обучение</TableCell>
            <TableCell align="center">Балл</TableCell>
            <TableCell align="center">Тестирование</TableCell>
            <TableCell align="center">Балл</TableCell>
            <TableCell align="center">Экзамен</TableCell>
            <TableCell align="center">Балл</TableCell>
            <TableCell>Последняя активность</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {progress.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell>{row.studentId}</TableCell>
              <TableCell>{row.studentName}</TableCell>
              <TableCell align="center">
                <StatusChip status={row.trainingStatus} />
              </TableCell>
              <TableCell align="center">
                <ScoreCell score={row.trainingScore} />
              </TableCell>
              <TableCell align="center">
                <StatusChip status={row.testingStatus} />
              </TableCell>
              <TableCell align="center">
                <ScoreCell score={row.testingScore} />
              </TableCell>
              <TableCell align="center">
                <StatusChip status={row.examStatus} />
              </TableCell>
              <TableCell align="center">
                <ScoreCell score={row.examScore} />
              </TableCell>
              <TableCell>
                {new Date(row.lastActivity).toLocaleString('ru-RU')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
