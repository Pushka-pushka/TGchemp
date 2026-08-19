
// src/components/Canvas/customNodes/CircuitNode.jsx
import { Handle, Position } from 'reactflow';

const typeStyles = {
  powerSource: { 
    background: '#fff5f5', 
    border: '2px solid #d32f2f', 
    color: '#b71c1c',
  },
  resistor: { 
    background: '#f0f7ff', 
    border: '2px solid #1976d2', 
    color: '#0d47a1',
  },
  capacitor: { 
    background: '#fffff0', 
    border: '2px solid #fbc02d', 
    color: '#f57f17',
  },
  ammeter: { 
    background: '#f0fdf9', 
    border: '2px solid #00796b', 
    color: '#004d40',
  },
  voltmeter: {
    background: '#f3e5f5',
    border: '2px solid #7b1fa2',
    color: '#4a148c',
  },
  switch: {
    background: '#eceff1',
    border: '2px solid #546e7a',
    color: '#37474f',
  },
  lamp: {
    background: '#fff8e1',
    border: '2px solid #ff8f00',
    color: '#e65100',
  },
  // Микросхема с множеством выходов
  chip: {
    background: '#f5f3ff',
    border: '2px solid #7c3aed',
    color: '#4c1d95',
  },
  default: { 
    background: '#f7fafc', 
    border: '2px solid #718096', 
    color: '#2d3748',
  },
};

const nodeBaseStyle = {
  padding: '15px',
  borderRadius: '12px',
  fontSize: '12px',
  fontWeight: 'bold',
  textAlign: 'center',
  minWidth: '160px',
  minHeight: '120px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
};

const handleStyle = {
  width: '12px',
  height: '12px',
  border: '2px solid #fff',
  borderRadius: '50%',
  cursor: 'crosshair',
};

/**
 * Конфигурация выходов для разных типов компонентов
 */
const componentHandles = {
  // Стандартные компоненты: 3 выхода
  default: {
    inputs: [
      { position: Position.Left, id: 'in-1', label: 'Вход', top: '50%' }
    ],
    outputs: [
      { position: Position.Right, id: 'out-1', label: 'Выход 1', top: '25%' },
      { position: Position.Right, id: 'out-2', label: 'Выход 2', top: '50%' },
      { position: Position.Right, id: 'out-3', label: 'Выход 3', top: '75%' }
    ]
  },
  // Микросхема: 4 выхода с именами
  chip: {
    inputs: [
      { position: Position.Left, id: 'vcc', label: 'VCC', top: '20%' },
      { position: Position.Left, id: 'gnd', label: 'GND', top: '80%' }
    ],
    outputs: [
      { position: Position.Right, id: 'out-a', label: 'A', top: '15%' },
      { position: Position.Right, id: 'out-b', label: 'B', top: '38%' },
      { position: Position.Right, id: 'out-c', label: 'C', top: '62%' },
      { position: Position.Right, id: 'out-d', label: 'D', top: '85%' }
    ]
  }
};

const CircuitNode = ({ data, selected }) => {
  const imagePath = data.icon || data.imagePath;
  const componentType = data.componentType || 'default';
  
  const currentTypeStyle = typeStyles[componentType] || typeStyles.default;
  
  // Получаем конфигурацию ручек для данного типа
  const handles = componentHandles[componentType] || componentHandles.default;
  
  const style = {
    ...nodeBaseStyle,
    ...currentTypeStyle,
    // Увеличиваем высоту, если много выходов
    minHeight: handles.outputs.length > 3 ? '180px' : '120px',
    boxShadow: selected 
      ? '0 0 0 3px #4299e1, 0 4px 12px rgba(0,0,0,0.2)' 
      : '0 2px 4px rgba(0,0,0,0.1)',
  };

  return (
    <div style={style}>
      {/* Входы */}
      {handles.inputs.map((input) => (
        <Handle
          key={input.id}
          type="target"
          position={input.position}
          id={input.id}
          style={{ 
            ...handleStyle, 
            left: input.position === Position.Left ? '-6px' : 'auto',
            right: input.position === Position.Right ? '-6px' : 'auto',
            top: input.top,
            background: '#4299e1' 
          }}
          title={input.label}
        />
      ))}
      
      {/* Выходы */}
      {handles.outputs.map((output) => (
        <Handle
          key={output.id}
          type="source"
          position={output.position}
          id={output.id}
          style={{ 
            ...handleStyle, 
            left: output.position === Position.Left ? '-6px' : 'auto',
            right: output.position === Position.Right ? '-6px' : 'auto',
            top: output.top,
            background: '#48bb78' 
          }}
          title={output.label}
        />
      ))}
      
      {/* Изображение компонента */}
      <div style={{ 
        width: '60px', 
        height: '60px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: '4px'
      }}>
        {imagePath ? (
          <img 
            src={imagePath} 
            alt={data.label || 'Компонент'}
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%', 
              objectFit: 'contain' 
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        
        <div style={{ 
          display: imagePath ? 'none' : 'flex',
          width: '60px',
          height: '60px',
          backgroundColor: '#e2e8f0',
          borderRadius: '8px',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          color: '#718096'
        }}>
          {componentType === 'powerSource' && '⚡'}
          {componentType === 'resistor' && 'Ω'}
          {componentType === 'capacitor' && '⊟'}
          {componentType === 'ammeter' && 'A'}
          {componentType === 'chip' && '⬡'}
          {!['powerSource', 'resistor', 'capacitor', 'ammeter', 'chip'].includes(componentType) && '⬡'}
        </div>
      </div>
      
      {/* Название компонента */}
      <div style={{ 
        fontSize: '13px', 
        fontWeight: '600',
        color: currentTypeStyle.color
      }}>
        {data.label}
      </div>
      
      {/* Список выходов (опционально) */}
      {handles.outputs.length > 1 && (
        <div style={{
          fontSize: '8px',
          color: '#718096',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          justifyContent: 'center',
          maxWidth: '140px'
        }}>
          {handles.outputs.map(out => (
            <span key={out.id} style={{
              background: '#f0fff4',
              padding: '1px 4px',
              borderRadius: '3px',
              border: '1px solid #c6f6d5'
            }}>
              {out.label}
            </span>
          ))}
        </div>
      )}
      
      {/* Параметры компонента */}
      <div style={{ 
        fontSize: '11px', 
        fontWeight: 'normal', 
        color: '#4a5568',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        width: '100%'
      }}>
        {data.voltage && (
          <span style={{ 
            background: '#fed7d7', 
            padding: '2px 8px', 
            borderRadius: '4px',
            fontSize: '10px'
          }}>
            ⚡ {data.voltage}
          </span>
        )}
        {data.resistance && (
          <span style={{ 
            background: '#c6e0ff', 
            padding: '2px 8px', 
            borderRadius: '4px',
            fontSize: '10px'
          }}>
            Ω {data.resistance}
          </span>
        )}
        {data.capacitance && (
          <span style={{ 
            background: '#fefcbf', 
            padding: '2px 8px', 
            borderRadius: '4px',
            fontSize: '10px'
          }}>
            ⊟ {data.capacitance}
          </span>
        )}
      </div>
    </div>
  );
};

export default CircuitNode;




// // src/components/Canvas/customNodes/CircuitNode.jsx
// import { Handle, Position } from 'reactflow';



// const typeStyles = {
//   powerSource: { background: '#ffd6d6', border: '2px solid #d32f2f', color: '#b71c1c' },
//   resistor: { background: '#d6e4ff', border: '2px solid #1976d2', color: '#0d47a1' },
//   capacitor: { background: '#fff9c4', border: '2px solid #fbc02d', color: '#f57f17' },
//   ammeter: { background: '#e0f2f1', border: '2px solid #00796b', color: '#004d40' },
//   default: { background: '#f7fafc', border: '2px solid #718096', color: '#2d3748' },
// };

// const nodeBaseStyle = {
//   padding: '15px 20px',
//   borderRadius: '8px',
//   fontSize: '12px',
//   fontWeight: 'bold',
//   textAlign: 'center',
//   minWidth: '120px',
//   boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//   position: 'relative',
// };

// const CircuitNode = ({ data, selected }) => {
//   const style = {
//     ...nodeBaseStyle,
//     ...(typeStyles[data.componentType] || typeStyles.default),
//     boxShadow: selected 
//       ? '0 0 0 2px #4299e1, 0 4px 6px rgba(0,0,0,0.1)' 
//       : nodeBaseStyle.boxShadow,
//   };

//   return (
//     <div style={style}>
//       {/* 
//         ЯВНОЕ РАЗДЕЛЕНИЕ:
//         - Левая сторона: ТОЛЬКО target (принимает соединения)
//         - Правая сторона: ТОЛЬКО source (исходит соединение)
//         - Верх и низ: ТОЛЬКО target (для гибкости)
        
//         Такой подход гарантирует, что соединения будут работать.
//         Пользователь тянет от правой стороны одного элемента
//         к левой стороне другого.
//       */}
      
//       {/* Левая сторона - только target (принимает входящие соединения) */}
//       <Handle
//         type="target"
//         position={Position.Left}
//         id="left"
//         style={{
//           background: '#4299e1',
//           width: '12px',
//           height: '12px',
//           border: '2px solid #fff',
//           left: '-6px',
//         }}
//       />
      
//       {/* Правая сторона - только source (исходящие соединения) */}
//       <Handle
//         type="source"
//         position={Position.Right}
//         id="right"
//         style={{
//           background: '#48bb78',
//           width: '12px',
//           height: '12px',
//           border: '2px solid #fff',
//           right: '-6px',
//         }}
//       />
      
//       {/* Верхняя сторона - target (для гибкости подключения) */}
//       <Handle
//         type="target"
//         position={Position.Top}
//         id="top"
//         style={{
//           background: '#4299e1',
//           width: '12px',
//           height: '12px',
//           border: '2px solid #fff',
//           top: '-6px',
//         }}
//       />
      
//       {/* Нижняя сторона - target (для гибкости подключения) */}
//       <Handle
//         type="target"
//         position={Position.Bottom}
//         id="bottom"
//         style={{
//           background: '#4299e1',
//           width: '12px',
//           height: '12px',
//           border: '2px solid #fff',
//           bottom: '-6px',
//         }}
//       />
      
//       {/* Данные компонента */}
//       <div style={{ marginBottom: '4px', fontSize: '14px' }}>
//         {data.label}
        
//       </div>
     
//       {data.voltage && (
//         <div style={{ fontSize: '10px', fontWeight: 'normal', marginTop: '4px' }}>
//           ⚡ {data.voltage}
//         </div>
//       )}
//       {data.resistance && (
//         <div style={{ fontSize: '10px', fontWeight: 'normal', marginTop: '4px' }}>
//           Ω {data.resistance}
//         </div>
//       )}
//       {data.capacitance && (
//         <div style={{ fontSize: '10px', fontWeight: 'normal', marginTop: '4px' }}>
//           ⊟ {data.capacitance}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CircuitNode;
