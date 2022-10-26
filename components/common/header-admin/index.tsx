import { useAuth } from '@/hooks/use-auth';
import * as React from 'react';
import HaderDesktop from './header-desktop';
import HeaderMobile from './header-mobile';

export default function HeaderAmin() {
    const { profile, firstLoading } = useAuth({
        revalidateOnMount: false,
    });
    return (
        <>
            {/* <HeaderMobile profiles={profile} /> */}
            <HaderDesktop profiles={profile} />
        </>
    );
}
