import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';
import { authApi } from '../api-client';

type Profile = any;

export function HanleApi(options?: Partial<PublicConfiguration>) {
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
    async function login() {
        await authApi.login({
            email: 'nguyet@gmail.com',
            password: '123123',
        });

        await mutate();
    }
    async function logout() {
        await authApi.logout();
        mutate({}, false);
    }

    return {
        profile: (profile as any)?.data,
        error,
        firstLoading,
        login,
        logout,
    };
}
