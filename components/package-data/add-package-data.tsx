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
import { SyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import ImageUploading from 'react-images-uploading';
import useSWR from 'swr';
import * as yup from 'yup';
import InputField from '../form/input-field';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useMatchMutate } from '@/hooks/match-mutate';

const schema = yup.object().shape({
    packageName: yup.string().required('Nhập tên gói cước!'),
    price: yup.string().required('Nhập số tiền đăng ký gói cước'),
    periodTime: yup.string().required('Nhập thời hạn cho gói cước'),
    employeePhone: yup.string().required('Nhập số đt nhân viên'),
    switchboardPhone: yup.string().required('Nhập số đt tổng đài'),
});
type ListAddIdCat = never | string[];

interface AddPackageDataProps {
    idCatProp?: any;
}
export default function AddPackageData({ idCatProp }: AddPackageDataProps) {
    const matchMutate = useMatchMutate();

    const {
        data: dataCat,
        error,
        mutate,
    } = useSWR('/catPackage', {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
    });

    const { data: dataFullBoard, mutate: mutateFullBoard } = useSWR('/fullBoard', {
        revalidateOnMount: false,
    });

    console.log({ dataCat });
    // const { mutate } = useSWRConfig();

    const [urlImgPackageData, setUrlImgPackageData] = useState('');
    const [loadingUploadImg, setLoadingUploadImg] = useState(false);
    const [listAddIdCat, setLisAddIdCat] = useState('');
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

    const handleChangeIdCat = (event: SyntheticEvent<Element, Event>): void => {
        const value = (event.target as HTMLInputElement).value;
        const checked = (event.target as HTMLInputElement).checked;
        console.log(value, checked);
        setLisAddIdCat(value);
    };

    // console.log({ listAddIdCat });
    async function hanleLoginSubmit(value: any) {
        if (listAddIdCat) {
            value.cat = listAddIdCat;
        }
        if (idCatProp) {
            value.cat = idCatProp;
        }
        if (urlImgPackageData !== '') {
            value.img = urlImgPackageData;
        }
        console.log(value);
        try {
            setIsLoading(true);
            setErrorPackageData(null);
            const res = await packageDataApi.add(value);
            if ((res as any).success) {
                setAddSuccess(true);
            }
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
            {!idCatProp && (
                <Box>
                    <Typography fontWeight={'bold'}>Chọn danh mục: </Typography>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        {dataCat &&
                            dataCat.catPackage.map((cat: any) => (
                                <Box key={cat._id}>
                                    <FormControlLabel
                                        value={cat._id}
                                        onChange={handleChangeIdCat}
                                        control={<Radio />}
                                        label={cat.nameCatPackge}
                                    />
                                </Box>
                            ))}
                    </RadioGroup>
                </Box>
            )}
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
                            console.log({ imageList });
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
                                    Chọn ảnh
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
                    Thêm mới thành công
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
                    Thêm gói cước
                </LoadingButton>
            </Stack>
        </Box>
    );
}
