// src/components/features/Controls/ControlPanel.jsx
const ControlPanel = ({ onAction }) => {
    const [valveOpen, setValveOpen] = useState(45);
    const [mode, setMode] = useState('AUTO');
  
    const handleValveChange = (value) => {
      setValveOpen(value);
      // Регистрируем действие оператора
      onAction({
        object_id: 4, // ID клапана CV-201
        action_description: `Изменение открытия клапана до ${value}%`,
      });
    };
  
    const handleModeChange = (newMode) => {
      setMode(newMode);
      onAction({
        object_id: 4,
        action_description: `Переключение режима на ${newMode}`,
      });
    };
  
    return (
      <div className="control-panel">
        <div>
          <label>Режим регулятора:</label>
          <select value={mode} onChange={(e) => handleModeChange(e.target.value)}>
            <option value="AUTO">AUTO</option>
            <option value="MANUAL">MANUAL</option>
          </select>
        </div>
        <div>
          <label>Открытие клапана: {valveOpen}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={valveOpen}
            onChange={(e) => handleValveChange(Number(e.target.value))}
          />
        </div>
      </div>
    );
  };