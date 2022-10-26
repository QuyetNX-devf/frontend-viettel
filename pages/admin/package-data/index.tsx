import React, { ChangeEvent, useEffect, useState } from 'react';
import {
    Box,
    Container,
    Link as MuiLink,
    Stack,
    SvgIcon,
    Tooltip,
    Typography,
} from '@mui/material';
import { AdminLayout } from '@/components/layout';
import useSWR, { useSWRConfig } from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPackageData from '@/components/package-data/add-package-data';
import { packageDataApi } from '@/api/package-data-api';
import LoadingPage from '@/components/common/Loading/loading-page';
import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/router';
import { useMatchMutate } from '@/hooks/match-mutate';

export default function DataPackage() {
    const router = useRouter();
    const { cache, mutate: mutatePage } = useSWRConfig();
    const matchMutate = useMatchMutate();
    const pageQuery = router.query.page ? +router.query.page : 1;
    console.log({ pageQuery });

    // const { data, error, mutate } = useSWR('/packageData2', {
    //     dedupingInterval: 60 * 60 * 1000,
    //     revalidateOnFocus: false,
    // });

    const { data, error, mutate } = useSWR(
        { api: 'packageData', param: pageQuery, holder: 'lol' },
        (value) => packageDataApi.get({ page: value.param }),
        {
            dedupingInterval: 60 * 60 * 1000,
            revalidateOnFocus: false,
        }
    );

    useEffect(() => {
        if ((data as any)?.packageData.length === 0 && pageQuery > 0) {
            // mutatePage({ api: 'packageData', param: pageQuery - 1 });
            matchMutate(/api:"packageData"/);

            router.push(`package-data?page=${pageQuery - 1}`);
        }
    }, [data, matchMutate, mutatePage, pageQuery, router]);

    const countRowPage = data
        ? Math.ceil((data as any).pagination.total / (data as any).pagination.limit)
        : 0;

    const [page, setPage] = useState(1);

    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
        router.push(`package-data?page=${value}`);
    };

    console.log({ data, countRowPage });
    const [Loading, setLoading] = useState(false);
    if (!data)
        return (
            <Box>
                <LoadingPage />
            </Box>
        );

    const packageDatas = (data as any)?.packageData;
    const hanldeDelPackageData = async (idPb: string) => {
        try {
            setLoading(true);
            await packageDataApi.delete(idPb);
            await mutate();
            // if ((data as any)?.packageData.length === 0 && pageQuery > 0) {
            //     await mutatePage(`packageData?page=${pageQuery - 1}`);
            // }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    console.log(data);
    // return null;
    return (
        <Container>
            {Loading ? <LoadingPage /> : ''}

            <Box marginTop={'50px'} marginBottom={'35px'}>
                <Link href={'/admin/package-data/add'} passHref>
                    <MuiLink border={'solid 1px '} borderRadius="5px" padding="5px 10px">
                        + Thêm gói cước
                    </MuiLink>
                </Link>
            </Box>

            <Box>
                {packageDatas?.map((data: any) => (
                    <Stack
                        key={data._id}
                        direction="row"
                        alignItems={'center'}
                        spacing={'15px'}
                        justifyContent="space-between"
                        borderBottom={'solid 1px #c1c1c1'}
                        padding={'10px 0'}
                    >
                        <Box width={'70px'} height="70px" position={'relative'}>
                            <Image
                                src={data.img === '' || !data.img ? '/img/not-img.png' : data.img}
                                alt="img"
                                layout="fill"
                                objectFit="cover"
                            />
                        </Box>
                        <Box flexGrow={1}>
                            <Typography fontWeight={'bold'}>{data.packageName}</Typography>
                            <Stack spacing={'10px'} direction="row">
                                <Typography color={'primary.main'} fontWeight={'bold'}>
                                    Đt Nhân viên:
                                </Typography>
                                <Typography>{data.employeePhone}</Typography>
                            </Stack>
                            <Stack spacing={'10px'} direction="row">
                                <Typography color={'primary.main'} fontWeight={'bold'}>
                                    Đt Tổng đài:
                                </Typography>
                                <Typography>{data.switchboardPhone}</Typography>
                            </Stack>
                            <Stack direction={'row'} spacing="15px">
                                <Typography color={'primary.main'} fontWeight={'bold'}>
                                    Thuộc danh mục:
                                </Typography>
                                <Box>{data.cat?.nameCatPackge}</Box>
                            </Stack>
                        </Box>
                        <Stack direction={'row'} spacing={1}>
                            <Link href={`package-data/${data._id}`} passHref>
                                <Tooltip title="Sửa" placement="top">
                                    <SvgIcon color="primary" component={EditLocationAltIcon} />
                                </Tooltip>
                            </Link>
                            <Box onClick={() => hanldeDelPackageData(data._id)}>
                                <Tooltip title="Xóa" placement="top">
                                    <SvgIcon color="primary" component={DeleteIcon} />
                                </Tooltip>
                            </Box>
                        </Stack>
                    </Stack>
                ))}
            </Box>
            {countRowPage > 1 && (
                <Stack
                    spacing={2}
                    margin={2}
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Pagination count={countRowPage} page={pageQuery} onChange={handleChange} />
                </Stack>
            )}
        </Container>
    );
}
DataPackage.Layout = AdminLayout;
