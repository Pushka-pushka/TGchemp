// src/components/features/Simulation/ScenarioInfo.jsx
const ScenarioInfo = ({ scenario, status, currentTick, sessionId }) => {
    const getStatusColor = () => {
      switch (status) {
        case 'running': return '#22c55e';
        case 'paused': return '#eab308';
        case 'passed': return '#22c55e';
        case 'failed': return '#ef4444';
        default: return '#6b7280';
      }
    };
  
    const getStatusText = () => {
      switch (status) {
        case 'idle': return 'Ожидание запуска';
        case 'running': return '🔄 Выполняется';
        case 'paused': return '⏸ Приостановлена';
        case 'passed': return '✅ Успешно завершена';
        case 'failed': return '❌ Провалена';
        default: return 'Неизвестно';
      }
    };
  
    return (
      <div className="scenario-info">
        <h2>{scenario.title}</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Статус:</span>
            <span className="value" style={{ color: getStatusColor() }}>
              {getStatusText()}
            </span>
          </div>
          <div className="info-item">
            <span className="label">Время:</span>
            <span className="value">{currentTick} сек.</span>
          </div>
          {scenario.max_time_seconds && (
            <div className="info-item">
              <span className="label">Лимит времени:</span>
              <span className="value">{scenario.max_time_seconds} сек.</span>
            </div>
          )}
          {sessionId && (
            <div className="info-item">
              <span className="label">Сессия:</span>
              <span className="value">#{sessionId}</span>
            </div>
          )}
        </div>
        <div className="task-description">
          <p>{scenario.task_description}</p>
        </div>
      </div>
    );
  };
  
  export default ScenarioInfo;