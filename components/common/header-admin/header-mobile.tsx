import { Box, Container } from '@mui/material';
import * as React from 'react';

interface HeaderMobileProps {
    profile: any;
}
export default function HeaderMobile(props: HeaderMobileProps) {
    return (
        <Box display={{ xs: 'block', lg: 'none' }}>
            <Container>Header mobile</Container>
        </Box>
    );
}
