import axios from 'axios';
import { DROPFEE_API_URL } from '../constants';
import { PingResponse } from '../models';
import { generateSignedMemo } from '../modules/signed-memo';
import logger from '../utils/logger';
const https = require('https');

const agent = new https.Agent({
    rejectUnauthorized: false,
});

export const ping = async () => {
    try {
        const signedData = await generateSignedMemo();
        console.log({ signedData });
        logger.info(`Send ping request`);
        console.log('send ping request');
        const { data: resp } = await axios.post(`${DROPFEE_API_URL}/admin/ping`, signedData, {
            headers: {
                'Content-Type': 'application/json',
            },
            httpsAgent: agent,
        });
        console.log('resp', { resp });
        const response = resp.data as PingResponse;
        return response;
    } catch (ex: any) {
        console.log('EXception at ping:', { ex, res: ex?.response?.data });
        logger.error(`Ping request failed - ${ex}`);
        return null;
    }
};
