// src/pages/EditorPage.jsx
import { useEffect } from 'react';
import { getTypes, getGroups } from '../api/equipment';
import useSchemeStore from '../store/schemeStore';
import useChatStore from '../store/chatStore';
import Palette from '../components/features/Palette/Palette';
import Canvas from '../components/features/Canvas/Canvas';

const EditorPage = () => {
  const { setTypes, setGroups } = useSchemeStore();
  const { setContext } = useChatStore();

  // Устанавливаем контекст для чата
  useEffect(() => {
    setContext('Редактор мнемосхем. Пользователь создает технологическую схему установки ЭЛОУ-АВТ, размещает оборудование и соединяет порты трубопроводами.');
    return () => setContext(null);
  }, [setContext]);

  // Загружаем справочники оборудования
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

  // Функция для обновления выбранного объекта (передается в Canvas)
  const handleSelectObject = (object) => {
    // Обновляем текущий объект в сторе чата
    useChatStore.getState().setCurrentObject(object);
  };

  return (
    <div className="editor-layout">
      <Palette />
      <Canvas onSelectObject={handleSelectObject} />
    </div>
  );
};

export default EditorPage;
