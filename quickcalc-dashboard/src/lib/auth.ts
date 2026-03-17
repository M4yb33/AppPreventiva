import { STORAGE_KEYS } from './constants';

export const auth = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  setToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  },

  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  getUser: (): any | null => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  setUser: (user: any): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  removeUser: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  clearAuth: (): void => {
    auth.removeToken();
    auth.removeUser();
  },

  isAuthenticated: (): boolean => {
    return !!auth.getToken();
  },
};
