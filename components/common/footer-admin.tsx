import { Box, Container, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import * as React from 'react';

export default function FooterAdmin() {
    return (
        <Box
            sx={{
                backgroundColor: 'primary.main',
                padding: '15px 0',
            }}
        >
            <Container>
                <Stack color={'#fff'}>
                    <Typography textAlign={'center'} component={'p'}>
                        © 2022 copyright Nguyen Xuan Quyet{' '}
                    </Typography>
                    <Typography textAlign={'center'} component={'p'}>
                        quyetnx04120@gmail.com
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
}
