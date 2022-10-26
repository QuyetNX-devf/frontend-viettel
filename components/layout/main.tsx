import { LayoutProps } from '@/models/common';
import { Box, Stack } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import FooterMain from '../common/footer-main';
import HeaderMain from '../common/header-main';

export function MainLayout({ children }: LayoutProps) {
    return (
        <Stack direction="column" minHeight={'100vh'} justifyContent={'space-between'}>
            <HeaderMain />
            <Box component={'main'} flexGrow={1}>
                <div>{children}</div>
            </Box>
            <FooterMain />
        </Stack>
    );
}
