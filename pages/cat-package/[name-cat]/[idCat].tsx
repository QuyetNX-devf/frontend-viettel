import LoadingPage from '@/components/common/Loading/loading-page';
import { MainLayout } from '@/components/layout';
import { ToSlug } from '@/utils/to-slung';
import { Box, Container, Typography } from '@mui/material';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import cn from 'classnames/bind';
import ListPackage from '@/components/common/listPackage';
import Head from 'next/head';
const cx = cn.bind(styles);

export interface CategoryPageProps {
    cat: any;
}

export default function CategoryPage({ cat }: CategoryPageProps) {
    // console.log({ cat });
    const router = useRouter();

    if (router.isFallback) {
        return <LoadingPage />;
    }
    if (!cat) return null;

    return (
        <Box>
            <Head>
                <title>{cat.nameCatPackge}</title>
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
                <meta name="dc.title" content={cat.nameCatPackge}></meta>
                <meta
                    name="dc.keywords"
                    content="Khuyến mại Data 3G/4G, Combo gọi thoại, SMS và các dịch vụ nội dung đặc sắc từ Viettel"
                ></meta>
                <meta
                    name="news_keywords"
                    content="Khuyến mại Data 3G/4G, Combo gọi thoại, SMS và các dịch vụ nội dung đặc sắc từ Viettel"
                ></meta>
                <meta name="og:title" content={cat.nameCatPackge}></meta>
                <meta
                    name="og:description"
                    content="Khuyến mại Data 3G/4G, Combo gọi thoại, SMS và các dịch vụ nội dung đặc sắc từ Viettel"
                ></meta>
                <meta name="og:image" content="/telecom.jpg"></meta>
            </Head>

            <Box className={cx('category-page')}>
                <Container>
                    <Typography className={cx('title')} component={'h1'}>
                        {cat.nameCatPackge} :
                    </Typography>
                    <ListPackage idCat={cat._id} />
                </Container>
            </Box>
        </Box>
    );
}

CategoryPage.Layout = MainLayout;

export const getStaticPaths: GetStaticPaths = async () => {
    let newPaths;
    try {
        const res = await axios.get(`http://localhost:5000/api/catPackage/allCat`);
        const data = res.data;
        newPaths = data.catPackage.map((cat: any) => {
            return {
                params: {
                    ['name-cat']: ToSlug(cat.nameCatPackge),
                    idCat: cat._id,
                },
            };
        });
    } catch (error) {
        return {
            paths: [],
            fallback: false,
        };
    }

    return {
        paths: newPaths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async (
    context: GetStaticPropsContext
) => {
    const idCat = context.params?.idCat;
    if (!idCat) return { notFound: true };
    let cat;

    try {
        const res = await axios.get(`http://localhost:5000/api/catPackage/${idCat}`);
        const data = res.data;
        if (data.success) {
            cat = data.catPackage;
            if (ToSlug(data.catPackage.nameCatPackge) !== context.params?.['name-cat']) {
                return { notFound: true };
            }

            if (data.catPackage._id !== context.params?.idCat) {
                console.log('error');
                return { notFound: true };
            }
        }
    } catch (error) {
        return { notFound: true };
    }

    return {
        props: {
            cat: cat,
        },
        revalidate: 5,
    };
};
