import { useCallback } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { CIRCUIT_ELEMENTS } from '../../constants/schemeElements';

const ElementsLibrary = () => {
  const onDragStart = useCallback((event, element) => {
    event.dataTransfer.setData(
      'application/reactflow',
      JSON.stringify({
        type: element.type,
        data: element.data,
      }),
    );
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  return (
    <Paper
      elevation={1}
      sx={{
        width: 220,
        minWidth: 220,
        p: 2,
        height: '100%',
        overflowY: 'auto',
        borderRadius: 0,
      }}
    >
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Сектор 3 — Компоненты
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {CIRCUIT_ELEMENTS.map((el) => (
          <Box
            key={el.label}
            draggable
            onDragStart={(event) => onDragStart(event, el)}
            title={`Перетащите ${el.label} на рабочую область`}
            className="element-item"
            sx={{
              p: 1.5,
              borderRadius: 1,
              cursor: 'grab',
              textAlign: 'center',
              fontWeight: 600,
              fontSize: 13,
              userSelect: 'none',
              transition: 'transform 0.1s',
              backgroundColor: el.style.backgroundColor,
              border: el.style.border,
            }}
          >
            {el.label}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default ElementsLibrary;
