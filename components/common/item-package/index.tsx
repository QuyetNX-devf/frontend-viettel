import { Box, Modal, Typography } from '@mui/material';
import * as React from 'react';
import styles from './index.module.scss';
import cn from 'classnames/bind';
const cx = cn.bind(styles);

export interface PackageItemProps {
    data: any;
}

export default function PackageItem({ data }: PackageItemProps) {
    const [showPopupDetail, setShowPopupDetail] = React.useState(false);
    const handleCloseFormUpdate = () => {
        setShowPopupDetail(false);
    };
    const handleShowPopup = () => {
        setShowPopupDetail(!showPopupDetail);
    };
    function smsbutton(dauso: any, sms: any) {
        var ua = navigator.userAgent.toLowerCase();
        var url;
        if (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1) {
            url = 'sms:' + dauso + '&body=' + sms;
            location.href = url;
        } else if (
            ua.indexOf('android') > -1 ||
            ua.indexOf('windows phone') > -1 ||
            ua.indexOf('blackberry') > -1
        ) {
            url = 'sms:' + dauso + '?body=' + sms;
            location.href = url;
        } else alert('Soạn tin nhắn: ' + sms + ' gửi đến ' + dauso);

        return false;
    }
    return (
        <Box>
            <Box className={cx('package')}>
                <Box className={cx('box-name')}>
                    <img src="/icons/img-fee-pack.png" alt="icons" />
                    <Typography className={cx('text')}>{data.packageName}</Typography>
                </Box>
                <Typography className={cx('price')}>{data.price}</Typography>
                <Typography className={cx('description')}>{data.goodwill}</Typography>
                <Typography
                    className={cx('submit')}
                    onClick={() =>
                        smsbutton(
                            data.switchboardPhone,
                            `${data.packageName} ${data.employeePhone}`
                        )
                    }
                >
                    Đăng ký
                </Typography>
                <Typography className={cx('detail')} onClick={handleShowPopup}>
                    Chi tiết
                </Typography>
            </Box>
            <Modal open={showPopupDetail} onClose={handleCloseFormUpdate}>
                <Box className={cx('wrap-popup')}>
                    <Box className={cx('close-popup')} onClick={handleShowPopup}>
                        X
                    </Box>
                    <Box className={cx('box-scroll')}>
                        <Typography className={cx('name-package')}>{data.packageName}</Typography>
                        <Box className={cx('wrap-detal')}>
                            <Typography marginBottom={'7px'}>
                                <Typography fontWeight={'bold'} component={'span'}>
                                    Giá cước:{' '}
                                </Typography>
                                {data.price} / {data.periodTime}
                            </Typography>
                            {data.goodwill && (
                                <Typography marginBottom={'7px'} component="div">
                                    <Typography fontWeight={'bold'}>Ưu đãi: </Typography>
                                    <Typography whiteSpace={'pre-line'}>{data.goodwill}</Typography>
                                </Typography>
                            )}
                            <Box marginBottom={'7px'}>
                                <Typography marginBottom={'7px'}>
                                    <Typography fontWeight={'bold'} component={'span'}>
                                        Đăng ký:{' '}
                                    </Typography>
                                    Bấm Đăng ký bên dưới hoặc xoạn tin
                                </Typography>
                                <Typography className={cx('text-syntax')} textAlign={'center'}>
                                    <Typography className={cx('text-red')} component={'span'}>
                                        {data.packageName}
                                    </Typography>
                                    <Typography className={cx('text-red')} component={'span'}>
                                        {data.employeePhone}
                                    </Typography>
                                    <Typography component={'span'} marginRight={'5px'}>
                                        Gửi
                                    </Typography>
                                    <Typography className={cx('text-red')} component={'span'}>
                                        {data.switchboardPhone}
                                    </Typography>
                                </Typography>
                            </Box>
                            {data.cancelRenewal && (
                                <Typography marginBottom={'7px'}>
                                    <Typography fontWeight={'bold'} component={'span'}>
                                        Hủy gia hạn:{' '}
                                    </Typography>
                                    {data.cancelRenewal}
                                </Typography>
                            )}
                            {data.cancelPackage && (
                                <Typography marginBottom={'7px'}>
                                    <Typography fontWeight={'bold'} component={'span'}>
                                        Hủy gói:{' '}
                                    </Typography>
                                    {data.cancelPackage}
                                </Typography>
                            )}
                        </Box>
                        <Box className={cx('button')}>
                            <Box
                                className={cx('submit')}
                                onClick={() =>
                                    smsbutton(
                                        data.switchboardPhone,
                                        `${data.packageName} ${data.employeePhone}`
                                    )
                                }
                            >
                                Đăng ký
                            </Box>
                            <Box
                                className={cx('un-submit')}
                                onClick={() => smsbutton(191, `HUY ${data.packageName}`)}
                            >
                                Hủy gia hạn
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
