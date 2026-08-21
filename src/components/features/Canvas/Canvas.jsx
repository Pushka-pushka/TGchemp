// src/components/features/Canvas/Canvas.jsx
import { useDrop } from 'react-dnd';
import { addObjectToScheme } from '../../api/schemes';
import useSchemeStore from '../../store/schemeStore';

const Canvas = ({ schemeId, onSelectObject }) => {
  const { objects, connections, addObject } = useSchemeStore();

  const onDrop = async (event) => {
    const groupId = Number(event.dataTransfer.getData('groupId'));
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    try {
      const response = await addObjectToScheme(schemeId, {
        group_id: groupId,
        pos_x: x,
        pos_y: y,
        custom_name: `Новый объект ${groupId}`,
        width: 100,
        height: 100,
        is_active: true,
      });
      addObject(response.data);
    } catch (error) {
      console.error('Failed to add object:', error);
    }
  };

  // Обработчик клика по объекту
  const handleObjectClick = (object) => {
    if (onSelectObject) {
      onSelectObject(object);
    }
  };

  return (
    <div
      className="canvas"
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {objects.map((obj) => (
        <SchemeObject 
          key={obj.object_id} 
          data={obj} 
          onClick={() => handleObjectClick(obj)}
        />
      ))}
      {connections.map((conn) => (
        <SchemeConnection key={conn.connection_id} data={conn} />
      ))}
    </div>
  );
};

export default Canvas;