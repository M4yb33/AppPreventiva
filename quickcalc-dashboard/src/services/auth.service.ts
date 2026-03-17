import { httpClient } from './api';
import { API_ENDPOINTS } from '@/lib/constants';
import { LoginCredentials, LoginResponse, Operator } from '@/types/auth';
import { ApiResponse } from '@/types/api';

export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await httpClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al iniciar sesión');
    }

    return response.data;
  },

  /**
   * Get current operator profile
   */
  async getMe(): Promise<Operator> {
    const response = await httpClient.get<Operator>(API_ENDPOINTS.AUTH.ME);

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener perfil');
    }

    return response.data;
  },

  /**
   * Logout (client-side only - clear tokens)
   */
  logout(): void {
    // No backend call needed, just clear local storage
    // This is handled by the auth context
  },
};
