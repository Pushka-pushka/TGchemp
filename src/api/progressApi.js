const MOCK_PROGRESS = [
  {
    id: '1',
    studentId: 'student-001',
    studentName: 'Иванов Иван',
    trainingStatus: 'completed',
    testingStatus: 'in_progress',
    examStatus: 'not_started',
    trainingScore: 95,
    testingScore: null,
    examScore: null,
    lastActivity: '2026-07-29T10:30:00',
  },
  {
    id: '2',
    studentId: 'student-002',
    studentName: 'Петрова Анна',
    trainingStatus: 'completed',
    testingStatus: 'completed',
    examStatus: 'in_progress',
    trainingScore: 88,
    testingScore: 92,
    examScore: null,
    lastActivity: '2026-07-29T14:15:00',
  },
  {
    id: '3',
    studentId: 'student-003',
    studentName: 'Сидоров Пётр',
    trainingStatus: 'in_progress',
    testingStatus: 'not_started',
    examStatus: 'not_started',
    trainingScore: null,
    testingScore: null,
    examScore: null,
    lastActivity: '2026-07-28T16:45:00',
  },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const progressApi = {
  async getStudentProgress() {
    await delay(600);
    return [...MOCK_PROGRESS];
  },

  async getStudentProgressById(studentId) {
    await delay(400);
    return MOCK_PROGRESS.find((p) => p.studentId === studentId) ?? null;
  },
};
