import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getProfile, updateProfile } from './api';
import { UpdateProfilePayload } from './types';

export function useProfile() {
    return useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
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
