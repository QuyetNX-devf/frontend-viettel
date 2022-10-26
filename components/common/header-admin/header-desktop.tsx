import { Box, Container, Link as MuiLink } from '@mui/material';

import AppBar from '@mui/material/AppBar';

import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AdbIcon from '@mui/icons-material/Adb';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { LIST_ROUTER } from './routes';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

const pages = ['Danh mục', 'Gói cước', 'Blog'];
const settings = ['Profile', 'Logout'];
const lisRouter = LIST_ROUTER;

interface HaderDesktopProps {
    profiles: any;
}
export default function HaderDesktop({ profiles }: HaderDesktopProps) {
    const router = useRouter();

    const { profile, login, logout } = useAuth({
        revalidateOnMount: false,
    });

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    // console.log({ router });
    // console.log(profile);
    return (
        <AppBar position="static">
            <Container>
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Link href="/admin" passHref>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            ADMIN
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {lisRouter.map((page, index) => (
                                <MenuItem key={index} onClick={handleCloseNavMenu}>
                                    <Link key={index} href={page.url} passHref>
                                        <MuiLink
                                            className={router.pathname === page.url ? 'active' : ''}
                                            textTransform={'uppercase'}
                                            color={'#000'}
                                            fontSize="13px"
                                            sx={{
                                                '&.active': {
                                                    borderBottom: 'solid 1px',
                                                },
                                            }}
                                        >
                                            {page.title}
                                        </MuiLink>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Link href="/admin" passHref>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            ADMIN
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {lisRouter.map((page, index) => (
                            <Link key={index} href={page.url} passHref>
                                <MuiLink
                                    className={router.pathname === page.url ? 'active' : ''}
                                    textTransform={'uppercase'}
                                    margin={1}
                                    color={'#fff'}
                                    sx={{
                                        '&.active': {
                                            borderBottom: 'solid 1px',
                                        },
                                    }}
                                >
                                    {page.title}
                                </MuiLink>
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp">N</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography
                                        textAlign="center"
                                        onClick={() => setting === 'Logout' && logout()}
                                    >
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
