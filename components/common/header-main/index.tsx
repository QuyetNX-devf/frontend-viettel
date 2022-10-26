/* eslint-disable @next/next/no-img-element */
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
import { ToSlug } from '@/utils/to-slung';

const cx = cn.bind(styles);
export default function HeaderMain() {
    const { data: dataCat } = useSWR('/catPackage/allCat', {
        revalidateOnFocus: false,
        dedupingInterval: 60 * 60 * 1000,
    });
    const [showMenu, setShowMenu] = useState(false);

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <Box className={styles.header}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: '#EE0033' }}>
                    <Container>
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={handleShowMenu}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Link href={'/'} passHref>
                                <Typography variant="h6" component="a" sx={{ flexGrow: 1 }}>
                                    <img src="/img/logo-header.png" alt="logo" />
                                </Typography>
                            </Link>
                            <Link
                                href={
                                    'https://viettel.vn/lan-toa/goi-cuoc?kh=1000756100_VTP_00057_DB'
                                }
                                passHref
                            >
                                <Button color="inherit" component={'a'}>
                                    Đăng nhập
                                </Button>
                            </Link>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
            <Box className={cx('navbar', { active: showMenu })}>
                <Box className={cx('wrapnav')}>
                    {dataCat &&
                        dataCat?.catPackage.map((cat: any) => (
                            <Link
                                href={`/cat-package/${ToSlug(cat.nameCatPackge)}/${cat._id}`}
                                key={cat._id}
                                passHref
                            >
                                <MuiLink onClick={handleShowMenu} className={styles.link}>
                                    {cat.nameCatPackge}
                                </MuiLink>
                            </Link>
                        ))}
                </Box>
            </Box>
            <Box onClick={handleShowMenu} className={cx('blur', { active: showMenu })}></Box>
        </Box>
    );
}
