import Loginform from '@/components/auth/login-form';
import { Box, Typography } from '@mui/material';

export default function LoginAdmin() {
    return (
        <Box
            sx={{
                maxWidth: '600px',
                padding: '15px',
                margin: 'auto',
                border: 'solid 1px #c1c1c1',
                marginTop: '50px',
                borderRadius: '5px',
            }}
        >
            <Typography sx={{ marginBottom: '15px' }} component={'h1'} variant="h5">
                Login admin
            </Typography>
            <Loginform />
        </Box>
    );
}
