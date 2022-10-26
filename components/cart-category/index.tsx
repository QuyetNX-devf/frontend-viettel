/* eslint-disable @next/next/no-img-element */
import { Box, Typography } from '@mui/material';
import * as React from 'react';
import styles from './index.module.scss';
import cn from 'classnames/bind';
export interface CartCategoryProps {
    onScroll: any;
}

const cx = cn.bind(styles);

const listCart = [
    {
        id: 'di-dong',
        title: 'Di động',
        img: '/icons/di-dong.png',
    },
    {
        id: 'tra-sau',
        title: 'Chuyển sang trả sau',
        img: '/icons/cha-sau.png',
    },
    {
        id: 'truyen-hinh',
        title: 'Đăng ký Internet - truyền hình',
        img: '/icons/internet.png',
    },
    {
        id: 'nạp-tien',
        title: 'Thanh toán cước - nạp tiền',
        img: '/icons/nap-tien.png',
    },
    {
        id: 'sim-so',
        title: 'Mua sim số',
        img: '/icons/mua-sim-so.png',
    },
    {
        id: 'dien-thoai',
        title: 'Điện thoại - thiết bị di động',
        img: '/icons/dien-thoai.png',
    },
];

export default function CartCategory({ onScroll }: CartCategoryProps) {
    return (
        <Box>
            <Box className={cx('wrap-flex')}>
                {listCart.map((cart: any, index: number) => (
                    <Box
                        className={cx('wrapper')}
                        key={cart.id}
                        onClick={() => (index > 0 ? onScroll(index) : null)}
                    >
                        <Box className={cx('wrap-img')}>
                            <img src={cart.img} alt={cart.title} />
                        </Box>
                        <Typography className={cx('title')} fontWeight={'bold'}>
                            {cart.title}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
