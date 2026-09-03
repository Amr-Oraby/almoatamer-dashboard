import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { login, logout } from './api';
import { LoginPayload } from './types';

export function useLogin() {
  return useMutation({
    mutationFn: (credentials: LoginPayload) => login(credentials),
    onSuccess: () => {
      toast.success('Logged in successfully');
    },
    onError: (err: any) => {
      const errorMessage = err?.message || 'An error occurred during login';
      toast.error(errorMessage);
    }
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      toast.success('Logged out successfully');
    },
    onError: (err: any) => {
      const errorMessage = err?.message || 'An error occurred during logout';
      toast.error(errorMessage);
    }
  });
}
