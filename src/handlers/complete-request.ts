import axios from 'axios';
import { DROPFEE_API_URL } from '../constants';
import { generateSignedMemo } from '../modules/signed-memo';
import logger from '../utils/logger';
const https = require('https');
const agent = new https.Agent({
    rejectUnauthorized: false,
});

export const completeRequest = async (txHash: string, transactionId: number) => {
    try {
        const signedData = await generateSignedMemo();

        logger.info(`Complete request - ${txHash}`);
        await axios.post(
            `${DROPFEE_API_URL}/drop-fee/complete`,
            {
                ...signedData,
                txHash,
                transactionId,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                httpsAgent: agent,
            },
        );
        return true;
    } catch (ex) {
        logger.error(`Complete request failed - ${ex}`);
        return false;
    }
};

export const failedRequest = async (transactionId: number) => {
    try {
        const signedData = await generateSignedMemo();

        await axios.post(
            `${DROPFEE_API_URL}/drop-fee/failed`,
            {
                ...signedData,
                transactionId,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                httpsAgent: agent,
            },
        );
        return true;
    } catch (ex) {
        logger.error(`Complete request failed - ${ex}`);
        return false;
    }
};
