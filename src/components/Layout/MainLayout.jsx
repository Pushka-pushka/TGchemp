// src/components/layout/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import ChatWidget from './ChatWidget/ChatWidget';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="content-area">
        <Outlet /> {/* Здесь рендерятся страницы */}
      </div>
      <ChatWidget /> {/* Всегда на месте */}
    </div>
  );
};

export default MainLayout;