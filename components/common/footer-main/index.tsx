import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Link as MuiLink } from '@mui/material';
import styles from './index.module.scss';
import useSWR from 'swr';
import Link from 'next/link';
import cn from 'classnames/bind';
import Image from 'next/image';

const cx = cn.bind(styles);
export default function FooterMain() {
    const { data: dataCat } = useSWR('/catPackage');
    const [showMenu, setShowMenu] = useState(false);

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <Box className={cx('footer')}>
            <Box className={cx('top')}>
                <Container>
                    <Box className={cx('img')}>
                        <Image src="/img/logo-footer.png" alt="img" width={99} height={21} />
                    </Box>
                    <Typography>WEBSITE MUA SẮM ONLINE CHÍNH THỨC CỦA VIETTEL TELECOM.</Typography>
                    <Typography>
                        Cơ quan chủ quản: Tổng Công ty Viễn thông Viettel (Viettel Telecom) - Chi
                        nhánh Tập đoàn Công nghiệp - Viễn thông Quân đội. Mã số doanh nghiệp:
                        0100109106-011 do Sở Kế hoạch và Đầu tư Thành phố Hà Nội cấp lần đầu ngày
                        18/07/2005, sửa đổi lần thứ 15 ngày 18/12/2018. Chịu trách nhiệm nội dung:
                        Ông Cao Anh Sơn
                    </Typography>
                    <Typography>© Viettel Telecom 2015. All rights reserved..</Typography>
                </Container>
            </Box>
            <Box className={cx('bot')}>
                <Box className={cx('content')}>
                    <Typography>Chăm sóc khách hàng: 098511118 </Typography>
                    <Typography>Nhân viên: Trần Thị Nguyệt</Typography>
                </Box>
            </Box>
        </Box>
    );
}
