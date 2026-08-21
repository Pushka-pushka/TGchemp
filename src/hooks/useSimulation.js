// src/hooks/useSimulation.js
import { useEffect, useRef, useState } from 'react';
import { startSession, getSessionStates, logAction, stopSession } from '../api/simulation';
import { calculateFormula } from '../api/formulas';
import useSimStore from '../store/simStore';
import useVictoryCheck from './useVictoryCheck';

export const useSimulation = () => {
  const {
    sessionId,
    status,
    currentTick,
    states,
    setSession,
    updateStates,
    setStatus,
    incrementTick,
  } = useSimStore();

  const [operatorActions, setOperatorActions] = useState([]);
  const timerRef = useRef(null);

  // Запуск сессии
  const start = async (schemeId, userId, scenarioId) => {
    try {
      const response = await startSession({ scheme_id: schemeId, user_id: userId, scenario_id: scenarioId });
      setSession(response.data);
      startTimer();
    } catch (error) {
      console.error('Failed to start simulation:', error);
    }
  };

  // Запуск таймера
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (status === 'running') {
        performTick();
      }
    }, 1000);
  };

  // Шаг симуляции (тик)
  const performTick = async () => {
    try {
      // 1. Собираем текущие значения из стора
      const currentStates = states;

      // 2. Формируем payload для формулы
      const payload = {
        formula_code: 'REFLUX_SYSTEM_STEP',
        inputs: {
          fi_curr: currentStates.FI_201 || 80.0,
          ti_curr: currentStates.TI_201 || 125.0,
          pi_curr: currentStates.PI_201 || 1.2,
          lic_curr: currentStates.LIC_201 || 50.0,
          u: currentStates.U || 45.0,
          k_health: currentStates.K_HEALTH || 1.0,
          pump_status: currentStates.PUMP_STATUS || 1,
          dt: 1.0,
        },
      };

      // 3. Отправляем расчет на бэкенд
      const response = await calculateFormula(payload);
      const outputs = response.data.outputs;

      // 4. Обновляем состояние
      updateStates({
        FI_201: outputs.FI_201,
        TI_201: outputs.TI_201,
        PI_201: outputs.PI_201,
        LIC_201: outputs.LIC_201,
      });

      // 5. Проверяем критерии победы/поражения
      const { isPassed, isFailed } = useVictoryCheck(outputs);
      if (isPassed) {
        stop('PASSED');
      } else if (isFailed) {
        stop('FAILED');
      }

      // 6. Логируем действия оператора
      if (operatorActions.length > 0) {
        for (const action of operatorActions) {
          await logAction(sessionId, {
            timestamp_tick: currentTick,
            ...action,
          });
        }
        setOperatorActions([]); // Очищаем очередь
      }

      // 7. Увеличиваем тик
      incrementTick();
    } catch (error) {
      console.error('Tick failed:', error);
      stop('FAILED');
    }
  };

  // Остановка симуляции
  const stop = async (finalStatus) => {
    clearInterval(timerRef.current);
    try {
      await stopSession(sessionId, finalStatus);
      setStatus(finalStatus);
    } catch (error) {
      console.error('Failed to stop session:', error);
    }
  };

  // Регистрация действия оператора
  const registerAction = (action) => {
    setOperatorActions((prev) => [...prev, action]);
  };

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return {
    start,
    stop,
    registerAction,
    status,
    currentTick,
    states,
  };
};