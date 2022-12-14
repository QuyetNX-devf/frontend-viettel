import { useSWRConfig } from 'swr';
import { FullConfiguration } from 'swr/dist/types';

export const useMatchMutate = () => {
    const { cache, mutate } = useSWRConfig();
    return (matcher: any, ...args: any) => {
        if (!(cache instanceof Map)) {
            throw new Error('matchMutate requires the cache provider to be a Map instance');
        }

        const keys = [];

        for (const key of (cache as any).keys()) {
            if (matcher.test(key)) {
                keys.push(key);
            }
        }

        const mutations = keys.map((key) => mutate(key, ...args));
        return Promise.all(mutations);
    };
};
