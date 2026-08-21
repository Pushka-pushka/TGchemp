// src/pages/EditorPage.jsx
import { useEffect, useState } from 'react';
import { getTypes, getGroups } from '../api/equipment';
import useSchemeStore from '../store/schemeStore';
import useChatStore from '../store/chatStore';
import Palette from '../components/features/Palette/Palette';
import SchemeCanvas from '../components/features/Canvas/SchemeCanvas';
import { Box, Paper, Typography, Button } from '@mui/material'; // Если используете MUI
import './EditorPage.css';

const EditorPage = () => {
  const { setTypes, setGroups } = useSchemeStore();
  const { setContext } = useChatStore();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setContext('Редактор мнемосхем. Пользователь создает технологическую схему установки ЭЛОУ-АВТ, размещает оборудование и соединяет порты трубопроводами.');
    return () => setContext(null);
  }, [setContext]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typesRes, groupsRes] = await Promise.all([
          getTypes(),
          getGroups(),
        ]);
        setTypes(typesRes.data);
        setGroups(groupsRes.data);
      } catch (error) {
        console.error('Failed to load catalog:', error);
      }
    };
    fetchData();
  }, [setTypes, setGroups]);

  const handleSelectObject = (object) => {
    useChatStore.getState().setCurrentObject(object);
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } catch (error) {
        console.error('Failed to enter fullscreen:', error);
      }
    } else {
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      } catch (error) {
        console.error('Failed to exit fullscreen:', error);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <Box className={`editor-page ${isFullscreen ? 'fullscreen-active' : ''}`} sx={{ position: 'relative', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Кнопка полноэкранного режима - поверх всего */}
      <Button
        onClick={toggleFullscreen}
        variant="contained"
        size="small"
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 9999,
          backgroundColor: 'white',
          color: '#1e293b',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            backgroundColor: '#f8fafc',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }
        }}
      >
        {isFullscreen ? '⛶ Сжать' : '⛶ На весь экран'}
      </Button>

      {/* Основной контент редактора */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Сектор 3 - Палитра компонентов */}
        <Palette />

        {/* Сектор 2 - Рабочая область */}
        <Box sx={{ flex: 1, height: '100%', position: 'relative' }}>
          <SchemeCanvas height="100%" />
        </Box>
      </Box>
    </Box>
  );
};

export default EditorPage;