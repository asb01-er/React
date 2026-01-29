// src/util/auth.js
export const authMiddleWare = (history) => {
  // For now, just a dummy function
  const token = localStorage.getItem('AuthToken');
  if (!token) history.push('/login'); // redirect if no token
};
