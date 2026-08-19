export const CIRCUIT_ELEMENTS = [
  {
    type: 'circuitComponent',
    label: 'Источник питания',
    data: {
      componentType: 'powerSource',
      label: 'Источник питания',
      voltage: '12V',
      icon: '/images/components/battery.svg',
    },
    style: { backgroundColor: '#ffd6d6', border: '1px solid #d32f2f' },
  },
  {
    type: 'circuitComponent',
    label: 'Резистор',
    data: {
      componentType: 'resistor',
      label: 'Резистор',
      resistance: '100Ω',
      icon: '/images/components/resistor.svg',
    },
    style: { backgroundColor: '#d6e4ff', border: '1px solid #1976d2' },
  },
  {
    type: 'circuitComponent',
    label: 'Конденсатор',
    data: {
      componentType: 'capacitor',
      label: 'Конденсатор',
      capacitance: '10µF',
      icon: '/images/components/capacitor.svg',
    },
    style: { backgroundColor: '#fff9c4', border: '1px solid #fbc02d' },
  },
  {
    type: 'circuitComponent',
    label: 'Амперметр',
    data: {
      componentType: 'ammeter',
      label: 'Амперметр',
      icon: '/images/components/ammeter.svg',
    },
    style: { backgroundColor: '#e0f2f1', border: '1px solid #00796b' },
  },
  {
    type: 'circuitComponent',
    label: 'Вольтметр',
    data: {
      componentType: 'voltmeter',
      label: 'Вольтметр',
      icon: '/images/components/voltmeter.svg',
    },
    style: { backgroundColor: '#f3e5f5', border: '1px solid #7b1fa2' },
  },
  {
    type: 'circuitComponent',
    label: 'Выключатель',
    data: {
      componentType: 'switch',
      label: 'Выключатель',
      icon: '/images/components/switch.svg',
    },
    style: { backgroundColor: '#eceff1', border: '1px solid #546e7a' },
  },
  {
    type: 'circuitComponent',
    label: 'Лампа',
    data: {
      componentType: 'lamp',
      label: 'Лампа',
      icon: '/images/components/lamp.svg',
    },
    style: { backgroundColor: '#fff8e1', border: '1px solid #ff8f00' },
  },
];

export const TRAINING_TASK_TEXT =
  'Задание: Соберите электрическую схему согласно условию. ' +
  'Перетащите необходимые компоненты из панели элементов на рабочую область, ' +
  'соедините их между собой и сохраните результат. ' +
  'Убедитесь, что все элементы подключены корректно.';
