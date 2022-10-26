import * as React from 'react';
import {
    Box,
    Container,
    Link as MuiLink,
    Stack,
    SvgIcon,
    Tooltip,
    Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingPage() {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '99',
            }}
        >
            <CircularProgress />
        </Box>
    );
}
