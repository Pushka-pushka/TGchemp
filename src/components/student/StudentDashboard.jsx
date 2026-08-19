import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { Layout } from '../common/Layout';
import { ExamModal } from './modals/ExamModal';
import { TestingModal } from './modals/TestingModal';
import { TrainingModal } from './modals/TrainingModal';

export function StudentDashboard() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <Layout title="Панель ученика">
      <Typography variant="h4" gutterBottom>
        Добро пожаловать!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Выберите режим работы с тренажёром построения и обработки схем
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<SchoolIcon />}
          onClick={() => setActiveModal('training')}
          sx={{ minWidth: 200, py: 2 }}
        >
          Обучение
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<QuizIcon />}
          onClick={() => setActiveModal('testing')}
          sx={{ minWidth: 200, py: 2 }}
        >
          Тестирование
        </Button>
        <Button
          variant="contained"
          color="warning"
          size="large"
          startIcon={<AssignmentIcon />}
          onClick={() => setActiveModal('exam')}
          sx={{ minWidth: 200, py: 2 }}
        >
          Экзамен
        </Button>
      </Box>

      <TrainingModal
        open={activeModal === 'training'}
        onClose={() => setActiveModal(null)}
      />
      <TestingModal
        open={activeModal === 'testing'}
        onClose={() => setActiveModal(null)}
      />
      <ExamModal
        open={activeModal === 'exam'}
        onClose={() => setActiveModal(null)}
      />
    </Layout>
  );
}
