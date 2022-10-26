/* eslint-disable @next/next/no-img-element */
import { Box, Typography } from '@mui/material';
import { forwardRef, useRef } from 'react';
import styles from './index.module.scss';
import cn from 'classnames/bind';
import Link from 'next/link';
const cx = cn.bind(styles);

const data = [
    {
        id: 'tra-sau',
        title: 'Chuyển sang trả sau',
        img: '/service/tra-sau.png',
        description:
            'Chuyển đổi sang trả sau ngay tại đây để nhận được những ưu đãi hấp dẫn dành riêng cho thuê bao của bạn.',
        url: 'https://viettel.vn/chuyentrasau?ch=1000756100_VTP_00057_DB',
    },
    {
        id: 'truyen-hinh',
        title: 'Đăng ký Internet - truyền hình',
        img: '/service/internet.png',
        description:
            'Tặng đến 4 tháng cước, MIỄN PHÍ hòa mạng khi đóng cước trước.Trang bị MIỄN PHÍ Modem WIFI trong suốt thời gian sử dụng.',
        url: 'https://viettel.vn/internet-truyenhinh/combo?ch=1000756100_VTP_00057_DB',
    },
    {
        id: 'nạp-tien',
        title: 'Thanh toán cước - nạp tiền',
        img: '/service/nap-tien.png',
        description: 'Thanh toán - Nạp tiền online nhanh chóng, tiện lợi.',
        url: 'https://viettel.vn/pay/ts?ch=1000756100_VTP_00057_DB',
    },
    {
        id: 'sim-so',
        title: 'Mua sim số',
        img: '/service/mua-sim.png',
        description:
            'Đừng bỏ lỡ cơ hội sở hữu hàng ngàn sim số đẹp: TAM HOA, LỘC PHÁT, THẦN TÀI, SỐ TIẾN, SỐ GÁNH...và các số đẹp theo nhu cầu.',
        url: 'https://viettel.vn/di-dong/sim-so?ch=1000756100_VTP_00057_DB',
    },
    {
        id: 'dien-thoai',
        title: 'Điện thoại - thiết bị di động',
        img: '/service/dien-thoai.jpg',
        description:
            'Mua online điện thoại, thiết bị thông minh, ... chính hãng, chất lượng uy tín với nhiều chương trình ưu đãi hấp dẫn.',
        url: 'https://viettel.vn/dien-thoai-thiet-bi?ch=1000756100_VTP_00057_DB',
    },
];

// eslint-disable-next-line react/display-name
const Service = forwardRef((props: any, ref: any) => {
    return (
        <Box className={cx('service')}>
            {data.map((service, index) => (
                <Box ref={ref[`scrollRef${index + 1}`]} key={service.id} className={cx('wrapper')}>
                    <Box className={cx('col_1')}>
                        <Box className={cx('text')}>
                            <Typography className={cx('title')}>{service.title}</Typography>
                            <Typography className={cx('description')}>
                                {service.description}
                            </Typography>
                        </Box>
                        <Link href={service.url} passHref>
                            <a className={cx('btn')}>Thanh toán</a>
                        </Link>
                    </Box>
                    <Box className={cx('col_2')}>
                        <Link href={service.url} passHref>
                            <a className={cx('wrap-img')}>
                                <img src={service.img} alt={service.title} />
                            </a>
                        </Link>
                    </Box>
                </Box>
            ))}
        </Box>
    );
});
export default Service;
