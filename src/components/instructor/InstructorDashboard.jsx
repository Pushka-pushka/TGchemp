import { Typography } from '@mui/material';
import { Layout } from '../common/Layout';
import { ProgressTable } from '../instructor/ProgressTable';

export function InstructorDashboard() {
  return (
    <Layout title="Панель инструктора">
      <Typography variant="h4" gutterBottom>
        Прогресс учеников
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Мониторинг обучения работе с тренажёром схем
      </Typography>
      <ProgressTable />
    </Layout>
  );
}
