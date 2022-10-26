import { Box, Pagination, Stack } from '@mui/material';
import styles from './index.module.scss';
import cn from 'classnames/bind';
import useSWR from 'swr';
import LoadingPage from '../Loading/loading-page';
import PackageItem from '../item-package';
import { useRouter } from 'next/router';
import { packageDataApi } from '@/api/package-data-api';
import { ChangeEvent } from 'react';
const cx = cn.bind(styles);

export interface ListPackageProps {
    idCat: string;
}

export default function ListPackage({ idCat }: ListPackageProps) {
    // const { data, error } = useSWR(`http://localhost:5000/api/packageData?categoryId=${idCat}`);

    const router = useRouter();
    const pageQuery = router.query.page ? +router.query.page : 1;

    const { data, error, mutate } = useSWR(
        { api: 'packageData', param: pageQuery, idCat },
        (value) => packageDataApi.get({ page: value.param, categoryId: value.idCat }),
        {
            dedupingInterval: 60 * 60 * 1000,
            revalidateOnFocus: false,
        }
    );
    const countRowPage = data
        ? Math.ceil((data as any).pagination.total / (data as any).pagination.limit)
        : 0;

    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        router.push({
            query: {
                ...router.query,
                page: value,
            },
        });
        // router.push(`?page=${value}`);
    };

    if (!data) return <LoadingPage />;
    if (!data && error) return null;
    return (
        <Box>
            <Box className={cx('list-package')}>
                {data &&
                    (data as any)?.packageData.map((itemPackage: any) => (
                        <Box className={cx('wrap-item')} key={itemPackage._id}>
                            <PackageItem data={itemPackage} />
                        </Box>
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
                    <Pagination
                        count={countRowPage}
                        page={pageQuery}
                        onChange={handleChange}
                        sx={{
                            '& .Mui-selected': {
                                backgroundColor: '#EE0033 !important',
                                color: '#fff',
                            },
                        }}
                    />
                </Stack>
            )}
        </Box>
    );
}
