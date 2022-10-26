import { LayoutProps } from '@/models/common';
import { Box, Stack } from '@mui/material';
import Link from 'next/link';
import * as React from 'react';
import Auth from '../common/auth';
import FooterAdmin from '../common/footer-admin';
import HeaderAmin from '../common/header-admin';

export function AdminLayout({ children }: LayoutProps) {
    return (
        <Auth>
            <>
                <Stack direction="column" minHeight={'100vh'} justifyContent={'space-between'}>
                    <HeaderAmin />
                    <Box
                        component={'main'}
                        flexGrow={1}
                        sx={{
                            padding: {
                                md: '10px',
                            },
                        }}
                    >
                        <div>{children}</div>
                    </Box>
                    <FooterAdmin />
                </Stack>
            </>
        </Auth>
    );
}
