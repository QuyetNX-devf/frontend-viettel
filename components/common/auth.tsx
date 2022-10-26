import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

interface ChildrenProps {
    children: any;
}
export default function Auth({ children }: ChildrenProps) {
    const router = useRouter();

    const { profile, firstLoading } = useAuth();
    // console.log(profile);
    useEffect(() => {
        if (!firstLoading && !profile) {
            router.push('/admin/login');
        }
    }, [router, profile, firstLoading]);

    if (!profile) return <div>Loading...</div>;

    return <div>{children}</div>;
}
