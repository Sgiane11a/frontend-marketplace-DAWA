export interface User {
  id: number;
  username: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}
