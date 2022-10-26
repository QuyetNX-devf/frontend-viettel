import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';
import { authApi } from '../api-client';
import { LoginPayload } from '../models';

type Profile = any;

export function useAuth(options?: Partial<PublicConfiguration>) {
    const {
        data: profile,
        error,
        mutate,
    } = useSWR('/profile', {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
        ...options,
    });

    const firstLoading = profile === undefined && error === undefined;
    const isLoading = !error && !profile;
    async function login(payload: LoginPayload) {
        await authApi.login(payload);
        await mutate();
    }
    async function logout() {
        await authApi.logout();
        mutate({}, false);
    }

    return {
        profile: (profile as any)?.profile,
        error,
        firstLoading,
        isLoading,
        login,
        logout,
    };
}
