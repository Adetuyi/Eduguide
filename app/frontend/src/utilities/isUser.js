export const isStudent = (user) => user?.roles?.includes('STUDENT');

export const isLecturer = (user) => user?.roles?.includes('LECTURER');
