import { Box, Typography } from '@mui/material';
import * as React from 'react';
import styles from './index.module.scss';
import cn from 'classnames/bind';
import Link from 'next/link';
import useSWR from 'swr';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import PackageItem from '../common/item-package';
import { ToSlug } from '@/utils/to-slung';
import { useLazyLoadGroup } from '@/hooks/lady-load-group';

const cx = cn.bind(styles);

export interface CatMainProps {
    dataCat: any;
}
const MIL_PER_HOUR = 60 * 60 * 1000;

export default function CatMain({ dataCat }: CatMainProps) {
    const { data, mutate } = useSWR(`packageData?categoryId=${dataCat._id}`, {
        dedupingInterval: MIL_PER_HOUR,
        revalidateOnFocus: false,
        revalidateOnMount: false,
    });

    const { ref, scrollpoint } = useLazyLoadGroup(data);
    if (scrollpoint) mutate();

    return (
        <Box>
            <Box className={cx('box-cat')} ref={ref}>
                <Box className={cx('box-wrap-title')}>
                    <Typography className={cx('title')}>{dataCat.nameCatPackge}</Typography>
                    <Link href={`/cat-package/${ToSlug(dataCat.nameCatPackge)}/${dataCat._id}`}>
                        <a className={cx('more')}>Xem tất cả +</a>
                    </Link>
                </Box>
                {!data && (
                    <Box className="loading">
                        <Box className={cx('lds-facebook')}>
                            <Box></Box>
                            <Box></Box>
                            <Box></Box>
                        </Box>
                    </Box>
                )}

                {data && (
                    <Box className={cx('wrap-slide')}>
                        <Swiper
                            className="mySwiper"
                            slidesPerView={3}
                            spaceBetween={30}
                            // slidesPerGroup={3}
                            loop={false}
                            loopFillGroupWithBlank={true}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Navigation]}
                            breakpoints={{
                                0: {
                                    slidesPerView: 2,
                                    spaceBetween: 15,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                            }}
                        >
                            {data.packageData.map((item: any) => (
                                <SwiperSlide key={item._id}>
                                    <PackageItem data={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Box>
                )}

                {data?.packageData?.length === 0 && <Typography>Sắp có gói cước ...</Typography>}
            </Box>
        </Box>
    );
}
