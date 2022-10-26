// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';
import Cookies from 'cookies';

const proxy = httpProxy.createProxyServer();

export const config = {
    api: {
        bodyParser: false,
    },
};

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    return new Promise((resolve) => {
        //convert cookie to header authorization
        const cookies = new Cookies(req, res);
        const access_token = cookies.get('access_token');

        if (access_token) {
            req.headers.Authorization = `Bearer ${access_token}`;
        }

        //don't send cookies to API server
        req.headers.cookies = '';

        proxy.web(req, res, {
            // target: process.env.API_URL,
            target: 'https://backend-viettel.herokuapp.com/',
            changeOrigin: true,
            selfHandleResponse: false,
        });

        proxy.on('proxyRes', () => {
            resolve(true);
        });
    });
}
