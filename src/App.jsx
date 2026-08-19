import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './components/login/LoginPage';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { StudentDashboard } from './components/student/StudentDashboard';
import { InstructorDashboard } from './components/instructor/InstructorDashboard';
import { useAuth } from './hooks';

const theme = createTheme({
  palette: {
    primary: { main: '#1565c0' },
    secondary: { main: '#7b1fa2' },
  },
});

function RootRedirect() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Navigate to={user.role === 'instructor' ? '/instructor' : '/student'} replace />
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor"
            element={
              <ProtectedRoute allowedRole="instructor">
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<RootRedirect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
