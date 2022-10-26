import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import InputField from '../form/input-field';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';

export interface IAppProps {}

const schema = yup.object().shape({
    email: yup.string().email('email không đúng định dạng !').required('Nhập email !'),
    password: yup.string().required('Nhập mật khẩu !'),
});

export default function Loginform(props: IAppProps) {
    const router = useRouter();
    const [errorLogin, setErrorLogin] = useState(null);
    const [isLoadingLogin, setIsLoadingLogin] = useState(false);
    const { profile, login, logout } = useAuth({
        revalidateOnMount: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    async function hanleLoginSubmit(value: any) {
        try {
            setIsLoadingLogin(true);
            setErrorLogin(null);
            await login(value);
            router.push('/admin');
        } catch (error) {
            console.log({ error });
            if ((error as any).response.data.message) {
                setErrorLogin((error as any).response.data.message);
            } else {
                setErrorLogin((error as any).message);
            }
        } finally {
            setIsLoadingLogin(false);
        }
    }
    return (
        <Box component={'form'} onSubmit={handleSubmit(hanleLoginSubmit)}>
            <InputField
                type={'text'}
                control={control}
                name="email"
                size="small"
                label={'email'}
                fullWidth={true}
            />
            <InputField
                type={showPassword ? 'text' : 'password'}
                control={control}
                name="password"
                size="small"
                label={'Mật khẩu'}
                fullWidth={true}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword((prev) => !prev)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            {errorLogin && (
                <Box
                    sx={{
                        alignItems: 'center',
                        background: '#f44336',
                        borderRadius: '5px',
                        color: '#fff',
                        display: 'flex',
                        marginBottom: '15px',
                        padding: '7px 5px',
                    }}
                >
                    <ReportGmailerrorredIcon fontSize="small" />
                    {errorLogin}
                </Box>
            )}
            <LoadingButton
                loading={isLoadingLogin}
                loadingPosition="start"
                startIcon={<LoginIcon />}
                type="submit"
                variant="contained"
                size="small"
                sx={{
                    fontSize: '14px !important',
                    '&.Mui-disabled': {
                        backgroundColor: 'white',
                        color: '#000000a1',
                    },
                }}
            >
                Đăng nhập
            </LoadingButton>
        </Box>
    );
}
