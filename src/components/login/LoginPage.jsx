import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useLogin } from '../../hooks';

export function LoginPage() {
  const [userId, setUserId] = useState('');
  const { login, loading, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId.trim()) {
      login(userId.trim());
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
      }}
    >
      <Card sx={{ width: 420 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom align="center">
            Вход в систему
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Тренажёр построения и обработки схем
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="ID пользователя"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="student-001 или instructor-001"
              disabled={loading}
              sx={{ mb: 2 }}
            />

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading || !userId.trim()}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Войти'}
            </Button>
          </form>

          <Box sx={{ mt: 3 }}>
            <Typography variant="caption" color="text.secondary" display="block">
              Тестовые ID:
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Ученики: student-001, student-002, student-003
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              Инструкторы: instructor-001, instructor-002
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
