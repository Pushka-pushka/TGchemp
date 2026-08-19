import { Box, Button, Paper, Typography } from '@mui/material';
import { useScheme } from '../../store/SchemeContext';

const TaskHeader = ({ compact = false }) => {
  const { taskInfo, isSaving, saveScheme } = useScheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: compact ? 1.5 : 2,
        bgcolor: 'grey.50',
        borderBottom: 1,
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        flexWrap: 'wrap',
      }}
    >
      <Box>
        <Typography variant={compact ? 'subtitle1' : 'h6'} sx={{ mb: 0.5 }}>
          {taskInfo.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {taskInfo.description}
        </Typography>
      </Box>
      <Button
        variant="contained"
        onClick={saveScheme}
        disabled={isSaving}
        size={compact ? 'small' : 'medium'}
      >
        {isSaving ? 'Сохранение...' : 'Сохранить схему'}
      </Button>
    </Paper>
  );
};

export default TaskHeader;
