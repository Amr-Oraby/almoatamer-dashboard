import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getProfile, updateProfile, changePassword } from './api';
import { ProfileResponse, UpdateProfilePayload, ChangePasswordPayload } from './types';

export function useProfile() {
    return useQuery<ProfileResponse>({
        queryKey: ['profile'],
        queryFn: async () => await getProfile(),
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateProfilePayload) => updateProfile(data),
        onSuccess: () => {
            toast.success('Profile updated successfully');
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
        onError: (err: any) => {
            const errorMessage = err?.message || 'An error occurred while updating profile';
            toast.error(errorMessage);
        }
    });
}

export function useChangePassword() {
    return useMutation({
        mutationFn: (data: ChangePasswordPayload) => changePassword(data),
        onSuccess: () => {
            toast.success('Password changed successfully');
        },
        onError: (err: any) => {
            const errorMessage = err?.message || 'An error occurred while changing password';
            toast.error(errorMessage);
        }
    });
}
