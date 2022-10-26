import axiosClient from '@/api/axios-client';
import { EmptyLayout } from '@/components/layout';
import { SWRConfig } from 'swr';
import { AppPropsWithLayout } from '../models';
import '../styles/globals.css';

import { createEmotionCache, theme } from '@/utils/index';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({
    Component,
    pageProps,
    emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
    const Layout = Component.Layout ?? EmptyLayout;
    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <SWRConfig
                    value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}
                >
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </SWRConfig>
            </ThemeProvider>
        </CacheProvider>
    );
}

export default MyApp;
