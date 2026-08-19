
// src/api/schemeApi.js

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const saveSchemeToBackend = async (schemeData) => {
  console.log('API: Сохранение схемы...', schemeData);
  await delay(1000);
  console.log('API: Схема успешно сохранена (заглушка)');
  return { success: true, message: 'Схема сохранена локально (заглушка)' };
};

export const loadSchemeFromBackend = async (schemeId = 'default') => {
  console.log(`API: Загрузка схемы с ID: ${schemeId}...`);
  await delay(800);
  
  const mockScheme = {
    id: schemeId,
    name: 'Схема по умолчанию',
    nodes: [],
    edges: [],
  };
  
  console.log('API: Схема загружена (заглушка)', mockScheme);
  return mockScheme;
};
