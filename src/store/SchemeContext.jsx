import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { saveSchemeToBackend, loadSchemeFromBackend } from '../api/schemeApi';

const SchemeContext = createContext(null);

export const useScheme = () => {
  const context = useContext(SchemeContext);
  if (!context) {
    throw new Error('useScheme должен использоваться внутри SchemeProvider');
  }
  return context;
};

export const SchemeProvider = ({ children, taskInfo: taskInfoProp }) => {
  const [taskInfo] = useState(
    taskInfoProp ?? {
      title: 'Задание #67',
      description: 'Соберите простейшую электрическую схему',
    },
  );

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const schemeDataRef = useRef({ nodes: [], edges: [] });

  const registerSchemeData = useCallback((data) => {
    schemeDataRef.current = data;
  }, []);

  const saveScheme = useCallback(async () => {
    setIsSaving(true);
    try {
      const response = await saveSchemeToBackend(schemeDataRef.current);
      alert(response.message);
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert('Не удалось сохранить схему.');
    } finally {
      setIsSaving(false);
    }
  }, []);

  const loadScheme = useCallback(async (schemeId) => {
    setIsLoading(true);
    try {
      const data = await loadSchemeFromBackend(schemeId);
      return data;
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetScheme = useCallback(() => {
    schemeDataRef.current = { nodes: [], edges: [] };
  }, []);

  const value = {
    taskInfo,
    isSaving,
    isLoading,
    saveScheme,
    loadScheme,
    registerSchemeData,
    resetScheme,
  };

  return (
    <SchemeContext.Provider value={value}>
      {children}
    </SchemeContext.Provider>
  );
};
