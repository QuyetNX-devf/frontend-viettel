/* eslint-disable @next/next/no-img-element */
import { MainLayout } from '@/components/layout';
import { Box, Button, Container } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
// import Image from 'next/future/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../models';
import styles from '@/styles/index.module.scss';
import cn from 'classnames/bind';
import CartCategory from '@/components/cart-category';
import useSWR from 'swr';
import CatMain from '@/components/Cat-main';
import Service from '@/components/service';
import { useRef } from 'react';
const cx = cn.bind(styles);

const Home: NextPageWithLayout = () => {
    const router = useRouter();

    const scrollRef1 = useRef(null);
    const scrollRef2 = useRef(null);
    const scrollRef3 = useRef(null);
    const scrollRef4 = useRef(null);
    const scrollRef5 = useRef(null);

    const allRef: any = {
        scrollRef1,
        scrollRef2,
        scrollRef3,
        scrollRef4,
        scrollRef5,
    };
    const handleClickScroll = (index: number) => {
        (allRef as any)[`scrollRef${index}`].current.scrollIntoView({
            behavior: 'smooth',
        });
        console.log(scrollRef5.current);
    };

    function goToDetailPage() {
        router.push({
            pathname: '/posts',
        });
    }

    const { data: dataCat } = useSWR('/catPackage/allCat', {
        revalidateOnFocus: false,
        dedupingInterval: 60 * 60 * 1000,
    });
    console.log(dataCat);
    return (
        <Box>
            <Head>
                <title>Đăng ký gói cước di động Viettel</title>
                <meta
                    name="description"
                    content="Khuyến mại Data 3G/4G, Combo gọi thoại, SMS và các dịch vụ nội dung đặc sắc từ Viettel"
                />
                <meta
                    name="keywords"
                    content="Khuyến mại Data 3G/4G, Combo gọi thoại, SMS và các dịch vụ nội dung đặc sắc từ Viettel"
                />
                <meta name="og:url" content="/" />
                <meta
                    name="og:site_name"
                    content="Cổng thông tin chính thức về dịch vụ của Viettel Telecom"
                />
                <meta name="dc.title" content="Đăng ký gói cước di động Viettel"></meta>
                <meta
                    name="dc.keywords"
                    content="Khuyến mại Data 3G/4G, Combo gọi thoại, SMS và các dịch vụ nội dung đặc sắc từ Viettel"
                ></meta>
                <meta
                    name="news_keywords"
                    content="Khuyến mại Data 3G/4G, Combo gọi thoại, SMS và các dịch vụ nội dung đặc sắc từ Viettel"
                ></meta>
                <meta name="og:title" content="Đăng ký gói cước di động Viettel"></meta>
                <meta
                    name="og:description"
                    content="Khuyến mại Data 3G/4G, Combo gọi thoại, SMS và các dịch vụ nội dung đặc sắc từ Viettel"
                ></meta>
                <meta name="og:image" content="/telecom.jpg"></meta>
            </Head>
            <Box>
                <Box className={styles.banner}>
                    <img src="/img/banner.jpg" alt="img" />
                </Box>
                <Box>
                    <Container>
                        <CartCategory onScroll={handleClickScroll} />
                    </Container>
                </Box>
                {dataCat && (
                    <Container>
                        {dataCat.catPackage.map((cat: any) => (
                            <CatMain key={cat._id} dataCat={cat} />
                        ))}
                    </Container>
                )}
                <Container>
                    <Service ref={allRef} />
                </Container>
            </Box>
        </Box>
    );
};

Home.Layout = MainLayout;

export default Home;
