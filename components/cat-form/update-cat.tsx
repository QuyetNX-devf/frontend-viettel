import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, IconButton, InputAdornment, TextField, Stack } from '@mui/material';
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
import { useSWRConfig } from 'swr';
import { catPackageApi } from '@/api/cat-data-api';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export interface UpdateCatProps {
    isInfoCat: {
        idCat: string;
        nameCat: string;
    };
    onClose: () => void;
}

const schema = yup.object().shape({
    nameCatPackge: yup.string().required('Nhập tên danh mục !'),
});

export default function UpdateCat({ isInfoCat, onClose }: UpdateCatProps) {
    const { mutate } = useSWRConfig();
    const router = useRouter();
    const [errorCat, setErrorCat] = useState(null);
    const [successUpdate, setSuccessUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { profile, login, logout } = useAuth({
        revalidateOnMount: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const { control, handleSubmit, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            catPackageId: isInfoCat.idCat,
            nameCatPackge: isInfoCat.nameCat,
        },
    });
    async function hanleLoginSubmit(value: any) {
        try {
            setIsLoading(true);
            setErrorCat(null);
            await mutate('/catPackage', catPackageApi.update(value), {
                populateCache: (updatedCat, CatCache) => {
                    // filter the list, and return it with the updated item
                    const filteredCat = CatCache.catPackage.filter(
                        (cat: any) => cat._id !== isInfoCat.idCat
                    );
                    console.log({ CatCache });
                    setSuccessUpdate(updatedCat.success);
                    return {
                        success: updatedCat.success,
                        catPackage: [
                            { _id: value.catPackageId, nameCatPackge: value.nameCatPackge },
                            ...filteredCat,
                        ],
                    };
                },
                revalidate: false,
            });
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
            {successUpdate && (
                <Box
                    sx={{
                        alignItems: 'center',
                        background: '#45cb31',
                        borderRadius: '5px',
                        color: '#fff',
                        display: 'flex',
                        marginBottom: '15px',
                        padding: '7px 5px',
                    }}
                >
                    <CheckCircleIcon fontSize="small" />
                    Update thành công
                </Box>
            )}
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
            <Stack direction={'row'} spacing="15px">
                <LoadingButton
                    loading={isLoading}
                    loadingPosition="start"
                    startIcon={<FileUploadIcon />}
                    type="submit"
                    variant="contained"
                    size="small"
                >
                    Sửa
                </LoadingButton>
                <Button
                    onClick={onClose}
                    startIcon={<CloseIcon />}
                    color="warning"
                    variant="contained"
                    size="small"
                >
                    Đóng
                </Button>
            </Stack>
        </Box>
    );
}
