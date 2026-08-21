// src/pages/EditorPage.jsx
import { useEffect } from 'react';
import { getTypes, getGroups } from '../api/equipment';
import useSchemeStore from '../store/schemeStore';
import Palette from '../components/features/Palette/Palette';
import Canvas from '../components/features/Canvas/Canvas';

const EditorPage = () => {
  const { setTypes, setGroups } = useSchemeStore();

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

  return (
    <div className="editor-layout">
      <Palette />
      <Canvas />
    </div>
  );
};

export default EditorPage;