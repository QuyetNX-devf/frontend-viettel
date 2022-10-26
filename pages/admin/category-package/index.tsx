import { AdminLayout } from '@/components/layout';
import {
    Box,
    Container,
    Link as MuiLink,
    Stack,
    SvgIcon,
    Tooltip,
    Typography,
} from '@mui/material';
import Link from 'next/link';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import DeleteIcon from '@mui/icons-material/Delete';

import React, { useState } from 'react';
import useSWR from 'swr';
import { catPackageApi } from '@/api/cat-data-api';
import LoadingPage from '@/components/common/Loading/loading-page';
import AddCategory from '@/components/cat-form/add-cat';
import UpdateCat from '@/components/cat-form/update-cat';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '100%',
        sm: 400,
    },
    bgcolor: '#fff',
    border: '2px solid #556cd6',
    boxShadow: 24,
    padding: '50px 25px',
};

export default function CategoryPackage() {
    const [showFormUpdate, setShowFormUpdate] = useState(false);
    const [isInfoCat, setIsInfoCat] = useState({
        idCat: '',
        nameCat: '',
    });
    const [Loading, setLoading] = useState(false);
    const { data, error, mutate } = useSWR('/catPackage', {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
    });
    // console.log(data);

    if (!data) return <Box>Loading...</Box>;
    const { catPackage } = data;
    // console.log({ catPackage });
    const hanleDeleteCat = async (idCat: string) => {
        try {
            setLoading(true);
            await catPackageApi.delete(idCat);
            await mutate();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const handleUpdateCat = (cat: any) => {
        setShowFormUpdate(true);
        setIsInfoCat({
            idCat: cat._id,
            nameCat: cat.nameCatPackge,
        });
    };
    const handleCloseFormUpdate = () => {
        setShowFormUpdate(false);
    };
    return (
        <>
            <Container>
                {Loading ? <LoadingPage /> : ''}
                <Box marginTop={'50px'} marginBottom={'35px'}>
                    <Box
                        sx={{
                            paddingBottom: '15px',
                            borderBottom: 'solid 1px #556cd6',
                        }}
                    >
                        <AddCategory />
                    </Box>
                </Box>
                <Box margin={'18px 0'}>
                    {catPackage?.map((cat: any, index: number) => (
                        <Stack
                            borderBottom={'solid 1px #c1c1c1'}
                            marginBottom="20px"
                            key={cat._id}
                            direction={'row'}
                            justifyContent={'space-between'}
                        >
                            <Typography>{cat.nameCatPackge}</Typography>
                            <Stack direction={'row'} spacing={1}>
                                <Box onClick={() => handleUpdateCat(cat)}>
                                    <Tooltip title="Sửa" placement="top">
                                        <SvgIcon color="primary" component={EditLocationAltIcon} />
                                    </Tooltip>
                                </Box>
                                <Box onClick={() => hanleDeleteCat(cat._id)}>
                                    <Tooltip title="Xóa" placement="top">
                                        <SvgIcon color="primary" component={DeleteIcon} />
                                    </Tooltip>
                                </Box>
                            </Stack>
                        </Stack>
                    ))}
                </Box>

                <Modal
                    open={showFormUpdate}
                    onClose={handleCloseFormUpdate}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={style}>
                        <UpdateCat isInfoCat={isInfoCat} onClose={handleCloseFormUpdate} />
                    </Box>
                </Modal>
            </Container>
        </>
    );
}
CategoryPackage.Layout = AdminLayout;
