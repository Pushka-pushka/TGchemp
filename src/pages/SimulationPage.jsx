// src/pages/SimulationPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useChatStore from '../store/chatStore';
import useSimStore from '../store/simStore';
import { useSimulation } from '../hooks/useSimulation';
import { getScenarioById } from '../api/scenarios';
import DashboardPanel from '../components/features/Dashboard/DashboardPanel';
import ControlPanel from '../components/features/Controls/ControlPanel';
import ScenarioInfo from '../components/features/Simulation/ScenarioInfo';
import AlarmPanel from '../components/features/Simulation/AlarmPanel';
import './SimulationPage.css';

const SimulationPage = () => {
  const { scenarioId } = useParams(); // Получаем ID сценария из URL
  const navigate = useNavigate();
  
  // Сторы
  const { setContext } = useChatStore();
  const { 
    sessionId, 
    status, 
    currentTick, 
    states, 
    setScenario,
    resetSimulation 
  } = useSimStore();
  
  // Хук симуляции
  const { 
    start, 
    stop, 
    registerAction, 
    isLoading 
  } = useSimulation();
  
  // Локальное состояние
  const [scenarioData, setScenarioData] = useState(null);
  const [error, setError] = useState(null);

  // Устанавливаем контекст для чата
  useEffect(() => {
    const contextMessage = scenarioData 
      ? `Симуляция аварийной ситуации: "${scenarioData.title}". Оператор ликвидирует отклонения. Текущий тик: ${currentTick}.`
      : 'Симуляция аварийной ситуации. Оператор ликвидирует отклонения.';
    
    setContext(contextMessage);
    return () => setContext(null);
  }, [setContext, scenarioData, currentTick]);

  // Загружаем данные сценария
  useEffect(() => {
    const fetchScenario = async () => {
      if (!scenarioId) {
        setError('ID сценария не указан');
        return;
      }
      
      try {
        const response = await getScenarioById(scenarioId);
        setScenarioData(response.data);
        setScenario(response.data); // Сохраняем в глобальный стор
        setError(null);
      } catch (err) {
        console.error('Failed to load scenario:', err);
        setError('Не удалось загрузить сценарий. Проверьте соединение с сервером.');
      }
    };
    
    fetchScenario();
  }, [scenarioId, setScenario]);

  // Обработчик запуска симуляции
  const handleStart = async () => {
    if (!scenarioData) return;
    
    try {
      await start({
        schemeId: scenarioData.scheme_id,
        userId: 1, // В реальном приложении брать из userStore
        scenarioId: Number(scenarioId),
      });
    } catch (err) {
      console.error('Failed to start simulation:', err);
      setError('Не удалось запустить симуляцию. Попробуйте позже.');
    }
  };

  // Обработчик остановки
  const handleStop = async () => {
    if (window.confirm('Вы уверены, что хотите завершить симуляцию?')) {
      await stop('FAILED'); // Или 'PASSED' в зависимости от ситуации
      navigate('/reports'); // Перенаправляем на страницу отчетов
    }
  };

  // Обработчик сброса
  const handleReset = () => {
    resetSimulation();
    setScenarioData(null);
    // Перезагружаем сценарий
    const fetchScenario = async () => {
      const response = await getScenarioById(scenarioId);
      setScenarioData(response.data);
      setScenario(response.data);
    };
    fetchScenario();
  };

  // Если ошибка загрузки
  if (error) {
    return (
      <div className="simulation-error">
        <h2>⚠️ Ошибка</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/scenarios')}>
          Вернуться к списку сценариев
        </button>
      </div>
    );
  }

  // Если данные еще загружаются
  if (!scenarioData) {
    return (
      <div className="simulation-loading">
        <div className="spinner"></div>
        <p>Загрузка сценария...</p>
      </div>
    );
  }

  return (
    <div className="simulation-page">
      {/* Информация о сценарии и статусе */}
      <div className="simulation-header">
        <ScenarioInfo 
          scenario={scenarioData}
          status={status}
          currentTick={currentTick}
          sessionId={sessionId}
        />
        <div className="simulation-controls">
          {status === 'idle' && (
            <button 
              className="btn-start" 
              onClick={handleStart}
              disabled={isLoading}
            >
              {isLoading ? 'Запуск...' : '▶ Запустить симуляцию'}
            </button>
          )}
          {(status === 'running' || status === 'paused') && (
            <>
              <button className="btn-stop" onClick={handleStop}>
                ⏹ Остановить
              </button>
              <button className="btn-reset" onClick={handleReset}>
                🔄 Сбросить
              </button>
            </>
          )}
          {(status === 'passed' || status === 'failed') && (
            <button className="btn-report" onClick={() => navigate('/reports')}>
              📊 Посмотреть отчет
            </button>
          )}
        </div>
      </div>

      {/* Панель аварийной сигнализации */}
      <AlarmPanel states={states} />

      {/* Основной контент: приборы и управление */}
      <div className="simulation-content">
        <div className="dashboard-area">
          <DashboardPanel 
            states={states} 
            criteria={scenarioData.criteria}
            status={status}
          />
        </div>
        <div className="control-area">
          <ControlPanel 
            onAction={registerAction}
            disabled={status !== 'running'}
          />
        </div>
      </div>

      {/* Дополнительная информация */}
      <div className="simulation-footer">
        <div className="simulation-tips">
          <h4>💡 Подсказка</h4>
          <p>
            {status === 'idle' && 'Нажмите "Запустить симуляцию" для начала тренировки.'}
            {status === 'running' && 'Используйте панель управления для ликвидации аварии. При необходимости задайте вопрос ИИ-ассистенту.'}
            {status === 'passed' && '✅ Поздравляем! Вы успешно ликвидировали аварию.'}
            {status === 'failed' && '❌ Авария не ликвидирована. Попробуйте еще раз.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimulationPage;