
// src/components/Layout/AppLayout.jsx
import TaskHeader from '../Header/TaskHeader';
import ElementsLibrary from '../Library/ElementsLibrary';
import SchemeCanvas from '../Canvas/SchemeCanvas';

const AppLayout = () => {
  const layoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
  };

  const mainStyle = {
    display: 'flex',
    flexGrow: 1,
    height: '90vh',
  };

  return (
    <div style={layoutStyle}>
      <TaskHeader />
      <div style={mainStyle}>
        <ElementsLibrary />
        <SchemeCanvas />
      </div>
    </div>
  );
};

export default AppLayout;
