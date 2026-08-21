// src/components/features/Simulation/AlarmPanel.jsx
const AlarmPanel = ({ states }) => {
    const alarms = Object.entries(states).filter(([_, state]) => state.isAlarm);
    
    if (alarms.length === 0) {
      return (
        <div className="alarm-panel ok">
          <span className="alarm-icon">✅</span>
          <span>Все параметры в норме</span>
        </div>
      );
    }
  
    return (
      <div className="alarm-panel danger">
        <div className="alarm-header">
          <span className="alarm-icon">🚨</span>
          <span>Аварийные отклонения: {alarms.length}</span>
        </div>
        <div className="alarm-list">
          {alarms.map(([key, state]) => (
            <div key={key} className="alarm-item">
              <span className="alarm-param">{key}</span>
              <span className="alarm-value">{state.currentValue}</span>
              <span className="alarm-status">ПРЕВЫШЕНИЕ</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default AlarmPanel;