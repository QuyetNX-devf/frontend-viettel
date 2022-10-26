import { packageDataApi } from '@/api/package-data-api';
import { uploadImage } from '@/api/upload-img-api';
import { useAuth } from '@/hooks/use-auth';
import { yupResolver } from '@hookform/resolvers/yup';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Stack, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import ImageUploading from 'react-images-uploading';
import useSWR from 'swr';
import * as yup from 'yup';
import InputField from '../form/input-field';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { useMatchMutate } from '@/hooks/match-mutate';

const schema = yup.object().shape({
    packageName: yup.string().required('Nhập tên gói cước!'),
    price: yup.string().required('Nhập số tiền đăng ký gói cước'),
    periodTime: yup.string().required('Nhập thời hạn cho gói cước'),
    employeePhone: yup.string().required('Nhập số đt nhân viên'),
    switchboardPhone: yup.string().required('Nhập số đt tổng đài'),
});
type ListAddIdCat = never | string[];
type UpdatePackagePageFormProps = {
    idPackageData?: string;
};
export default function UpdatePackagePageForm({ idPackageData }: UpdatePackagePageFormProps) {
    const matchMutate = useMatchMutate();
    const {
        data: dataCat,
        error,
        mutate,
    } = useSWR('/catPackage', {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
    });

    const { mutate: mutateDataPackage } = useSWR('/packageData', {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
    });

    const {
        data: dataPackage,
        error: errorPackage,
        mutate: mutateDataPackageDetail,
    } = useSWR(`/packageData/?packageId=${idPackageData}`, {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
    });

    const { data: dataFullBoard, mutate: mutateFullBoard } = useSWR('/fullBoard', {
        revalidateOnMount: false,
    });

    const isPackageData = dataPackage?.packageData[0];

    const innitalArr: ListAddIdCat = [];
    const [urlImgPackageData, setUrlImgPackageData] = useState('');
    const [loadingUploadImg, setLoadingUploadImg] = useState(false);
    const [sttPickedIdCat, setSttPickedIdCat] = useState('');
    const [addSuccess, setAddSuccess] = useState(false);
    const router = useRouter();
    const [errorPackageData, setErrorPackageData] = useState(null);
    const [successUpdate, setSuccessUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { profile, login, logout } = useAuth({
        revalidateOnMount: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const { control, handleSubmit, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            idPackage: '',
            packageName: '',
            price: '',
            periodTime: '',
            goodwill: '',
            employeePhone: '',
            switchboardPhone: '',
            cancelRenewal: '',
            cancelPackage: '',
        },
    });

    useEffect(() => {
        reset({
            idPackage: idPackageData,
            packageName: isPackageData ? isPackageData.packageName : '',
            price: isPackageData ? isPackageData.price : '',
            periodTime: isPackageData
                ? isPackageData.periodTime
                    ? isPackageData.periodTime
                    : ''
                : '',
            goodwill: isPackageData ? isPackageData.goodwill : '',
            employeePhone: isPackageData ? isPackageData.employeePhone : '',
            switchboardPhone: isPackageData ? isPackageData.switchboardPhone : '',
            cancelRenewal: isPackageData ? isPackageData.cancelRenewal : '',
            cancelPackage: isPackageData ? isPackageData.cancelPackage : '',
        });
        setUrlImgPackageData(isPackageData?.img ? isPackageData.img : '');
        setSttPickedIdCat((prev) => {
            if (isPackageData?.cat?._id) {
                return isPackageData?.cat?._id;
            } else {
                return prev;
            }
        });
    }, [idPackageData, isPackageData, reset, router]);

    const handleChangeIdCat = (event: SyntheticEvent<Element, Event>): void => {
        const value = (event.target as HTMLInputElement).value;
        const checked = (event.target as HTMLInputElement).checked;
        setSttPickedIdCat(value);
    };
    async function hanleLoginSubmit(value: any) {
        if (sttPickedIdCat) {
            value.cat = sttPickedIdCat;
        }
        if (urlImgPackageData !== '') {
            value.img = urlImgPackageData;
        }
        try {
            setIsLoading(true);
            setErrorPackageData(null);
            const res = await packageDataApi.update(value);
            if ((res as any).success) {
                setAddSuccess(true);
            }
            await mutateDataPackageDetail();
            await matchMutate(/api:"packageData"/);
            await mutateFullBoard();
        } catch (error) {
            console.log({ error });
            if ((error as any).response?.data?.message) {
                setErrorPackageData((error as any).response?.data?.message);
            } else {
                setErrorPackageData((error as any).message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    if (!dataPackage) return null;
    return (
        <Box component={'form'} onSubmit={handleSubmit(hanleLoginSubmit)}>
            <Typography marginBottom={2} fontWeight={'bold'}>
                Nhập các trường:
            </Typography>
            <InputField
                type={'text'}
                control={control}
                name="packageName"
                size="small"
                label={'Nhập tên gói cước...'}
                fullWidth={true}
            />
            <InputField
                type={'text'}
                control={control}
                name="price"
                size="small"
                label={'Nhập giá gói cước'}
                fullWidth={true}
            />
            <InputField
                type={'text'}
                control={control}
                name="periodTime"
                size="small"
                label={'Nhập thời hạn gói cước'}
                fullWidth={true}
            />
            <InputField
                type={'text'}
                control={control}
                name="employeePhone"
                size="small"
                label={'Nhập đt nhân viên'}
                fullWidth={true}
            />
            <InputField
                type={'text'}
                control={control}
                name="switchboardPhone"
                size="small"
                label={'Nhập đt tổng đài'}
                fullWidth={true}
            />
            <InputField
                type={'text'}
                control={control}
                name="cancelRenewal"
                size="small"
                label={'Hủy gia hạn'}
                fullWidth={true}
            />
            <InputField
                type={'text'}
                control={control}
                name="cancelPackage"
                size="small"
                label={'Hủy gói'}
                fullWidth={true}
            />
            <InputField
                type={'text'}
                control={control}
                name="goodwill"
                size="small"
                label={'Nhập ưu đãi'}
                multiline
                rows={4}
                fullWidth={true}
            />
            <Box>
                <Typography fontWeight={'bold'}>Chọn danh mục: </Typography>
                <FormGroup>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={''}
                        name="radio-buttons-group"
                    >
                        {dataCat &&
                            dataCat.catPackage.map((cat: any, index: any) => {
                                let picked = sttPickedIdCat === cat._id;
                                return (
                                    <Box key={cat._id}>
                                        <FormControlLabel
                                            value={cat._id}
                                            onChange={handleChangeIdCat}
                                            control={<Radio checked={picked ? true : false} />}
                                            label={cat.nameCatPackge}
                                        />
                                    </Box>
                                );
                            })}
                    </RadioGroup>
                </FormGroup>
            </Box>
            <Box className="avatar-profile">
                <Box>
                    <Box width={'70px'} height="70px" position={'relative'}>
                        <Image
                            src={urlImgPackageData === '' ? '/img/not-img.png' : urlImgPackageData}
                            alt="img"
                            layout="fill"
                            objectFit="cover"
                        />
                    </Box>
                </Box>
                <ImageUploading
                    onChange={async (imageList: any) => {
                        try {
                            setLoadingUploadImg(true);
                            const res = await uploadImage(imageList[0].dataURL.split(',')[1]);
                            setUrlImgPackageData(res.display_url);
                        } catch (error) {
                            console.log(error);
                        } finally {
                            setLoadingUploadImg(false);
                        }
                    }}
                    value={[]}
                >
                    {({ onImageUpload, isDragging, dragProps }) => {
                        return (
                            <Stack
                                direction={'row'}
                                alignItems="center"
                                spacing="10px"
                                marginBottom={2}
                                sx={{
                                    cursor: 'pointer',
                                }}
                            >
                                <Typography
                                    className="camera"
                                    fontWeight={'bold'}
                                    style={isDragging ? { color: 'red' } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Chọn lại ảnh
                                </Typography>
                                {loadingUploadImg && <CircularProgress size={'20px'} />}
                            </Stack>
                        );
                    }}
                </ImageUploading>
            </Box>

            {addSuccess && (
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
                    Sửa gói cước thành công!
                </Box>
            )}
            {errorPackageData && (
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
                    {errorPackageData}
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
                    Sửa gói cước
                </LoadingButton>
            </Stack>
        </Box>
    );
}
