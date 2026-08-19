const MOCK_USERS = {
  'student-001': { id: 'student-001', name: 'Иванов Иван', role: 'student' },
  'student-002': { id: 'student-002', name: 'Петрова Анна', role: 'student' },
  'student-003': { id: 'student-003', name: 'Сидоров Пётр', role: 'student' },
  'instructor-001': { id: 'instructor-001', name: 'Козлов Алексей', role: 'instructor' },
  'instructor-002': { id: 'instructor-002', name: 'Морозова Елена', role: 'instructor' },
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authApi = {
  async login(request) {
    await delay(500);

    const user = MOCK_USERS[request.userId];
    if (!user) {
      throw new Error('Пользователь с указанным ID не найден');
    }

    return {
      user,
      token: `mock-token-${user.id}`,
    };
  },

  async logout() {
    await delay(200);
  },
};
