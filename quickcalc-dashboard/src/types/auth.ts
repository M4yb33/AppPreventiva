export type OperatorRole = 'ADMIN' | 'OPERATOR' | 'VIEWER';

export interface Operator {
  id: number;
  operatorName: string;
  email: string;
  role: OperatorRole;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  operator: Operator;
}

export interface AuthContextType {
  user: Operator | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}
