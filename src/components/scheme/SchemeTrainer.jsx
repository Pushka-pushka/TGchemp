import { Box, Paper, Typography } from '@mui/material';
import TaskHeader from '../Header/TaskHeader';
import ElementsLibrary from '../Library/ElementsLibrary';
import SchemeCanvas from '../Canvas/SchemeCanvas';
import { TaskSector } from './TaskSector';

export function SchemeTrainer({ embedded = true }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: embedded ? '70vh' : '100vh',
        overflow: 'hidden',
        bgcolor: 'background.paper',
      }}
    >
      <TaskHeader compact={embedded} />

      <Box sx={{ p: embedded ? 0 : 2 }}>
        <TaskSector />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          minHeight: 0,
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <Paper
            elevation={0}
            square
            sx={{
              px: 2,
              py: 1,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Сектор 2 — Рабочая область
            </Typography>
          </Paper>
          <SchemeCanvas height="100%" />
        </Box>
        <ElementsLibrary />
      </Box>
    </Box>
  );
}
