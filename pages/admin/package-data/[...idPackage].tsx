import * as React from 'react';
import { Box, Container } from '@mui/material';
import { AdminLayout } from '@/components/layout';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import UpdatePackagePageForm from '@/components/package-data/update-package-data';

export default function UpdatePackagePage() {
    const router = useRouter();
    const idPackageData = router.query.idPackage?.[0];
    return (
        <Container>
            <Box>
                <UpdatePackagePageForm idPackageData={idPackageData} />
            </Box>
        </Container>
    );
}

UpdatePackagePage.Layout = AdminLayout;
