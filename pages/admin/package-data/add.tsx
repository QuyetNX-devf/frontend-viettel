import * as React from 'react';
import { Container, Box, Typography } from '@mui/material';
import AddPackageData from '@/components/package-data/add-package-data';
import { AdminLayout } from '@/components/layout';

export default function AddPackagePage() {
    return (
        <Container>
            <Box marginTop={3}>
                <Typography color={'#556cd6'} marginBottom={3} fontWeight={'bold'} variant="h5">
                    Thêm mới gới cước:{' '}
                </Typography>
                <AddPackageData />
            </Box>
        </Container>
    );
}
AddPackagePage.Layout = AdminLayout;
