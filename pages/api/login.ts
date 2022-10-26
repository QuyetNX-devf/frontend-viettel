// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy, { ProxyResCallback } from 'http-proxy';
import Cookies from 'cookies';

const proxy = httpProxy.createProxyServer();

export const config = {
    api: {
        bodyParser: false,
    },
};

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    if (req.method !== 'POST') {
        return res.status(404).json({ message: 'method not supported' });
    }
    return new Promise((resolve) => {
        //don't send cookies to API server
        req.headers.cookies = '';

        const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
            let body = '';
            proxyRes.on('data', function (chunk) {
                body += chunk;
            });
            proxyRes.on('end', function () {
                console.log('body', body);
                try {
                    const { accessToken, success, message } = JSON.parse(body);
                    if (success) {
                        console.log({ accessToken });
                        //conver token to cookies
                        const cookies = new Cookies(req, res, {
                            secure: process.env.NODE_ENV !== 'development',
                        });
                        cookies.set('access_token', accessToken, {
                            httpOnly: true,
                            sameSite: 'lax',
                            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                        });

                        (res as NextApiResponse)
                            .status(200)
                            .json({ success: true, message: 'Login successfully' });
                    } else {
                        (res as NextApiResponse).status(401).json({ success, message });
                    }
                } catch (error) {
                    (res as NextApiResponse).status(500).json({ message: 'Something went wrong' });
                }

                resolve(true);
            });
        };

        proxy.once('proxyRes', handleLoginResponse);

        proxy.web(req, res, {
            // target: process.env.API_URL,
            target: 'https://backend-viettel.herokuapp.com/',
            changeOrigin: true,
            selfHandleResponse: true,
        });
    });
}
