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
import useSWR, { useSWRConfig } from 'swr';
import { catPackageApi } from '@/api/cat-data-api';

export interface IAppProps {}

const schema = yup.object().shape({
    nameCatPackge: yup.string().required('Nhập tên danh mục !'),
});

export default function AddCategory(props: IAppProps) {
    const { mutate: mutateConfig } = useSWRConfig();
    const { data, error, mutate } = useSWR('/catPackage', {
        revalidateOnMount: false,
    });

    const { data: dataFullBoard, mutate: mutateFullBoard } = useSWR('/fullBoard', {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
    });

    const router = useRouter();
    const [errorCat, setErrorCat] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { profile, login, logout } = useAuth({
        revalidateOnMount: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const { control, handleSubmit, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            nameCatPackge: '',
        },
    });
    async function hanleLoginSubmit(value: any) {
        try {
            setIsLoading(true);
            setErrorCat(null);
            // await mutateConfig('/catPackage', catPackageApi.add(value));
            await catPackageApi.add(value);
            await mutate();
            await mutateFullBoard();
            reset();
        } catch (error) {
            console.log({ error });
            if ((error as any).response.data.message) {
                setErrorCat((error as any).response.data.message);
            } else {
                setErrorCat((error as any).message);
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Box component={'form'} onSubmit={handleSubmit(hanleLoginSubmit)}>
            <InputField
                type={'text'}
                control={control}
                name="nameCatPackge"
                size="small"
                label={'Nhập tên danh mục...'}
                fullWidth={true}
                sx={{}}
            />

            {errorCat && (
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
                    {errorCat}
                </Box>
            )}
            <LoadingButton
                loading={isLoading}
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
                Thêm mới
            </LoadingButton>
        </Box>
    );
}
