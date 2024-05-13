import { ADMIN_ID } from './constants';
import { completeRequest, failedRequest } from './handlers/complete-request';
import { ping } from './handlers/ping';
import { dropScrt, testScrtWallet } from './modules/drop-scrt';
import { dropSol, testSolanaWallet } from './modules/drop-sol';
import { Network, ProcessStatus } from './types';
import { sleep } from './utils';
import logger from './utils/logger';

async function main() {
    testScrtWallet();
    testSolanaWallet();

    // Loop requests
    while (true) {
        // ping request
        const response = await ping();
        if (!response) {
            await sleep(30);
            continue;
        }

        if (!response.newRequest || response.nextAdminId != ADMIN_ID) {
            await sleep(3);
            continue;
        }

        // Process requests
        for (const transaction of response.newRequest.transactions) {
            if (transaction.status != ProcessStatus.Pending && transaction.status != ProcessStatus.Failed) {
                continue;
            }

            let txHash;

            try {
                if (transaction.network === Network.Solana) {
                    txHash = await dropSol(transaction);
                } else if (transaction.network === Network.Scrt) {
                    txHash = await dropScrt(transaction);
                }

                logger.info(
                    `Drop fee to ${transaction.address} with ${transaction.amount} ${transaction.network === Network.Scrt ? 'uSCRT' : 'lamports'} - ${txHash}`,
                );
            } catch (ex) {
                console.log('Error at index while drop fee', ex);
                // Update request as failed
                const exMsg = JSON.stringify(ex, null, 2);
                logger.error(
                    `Drop fee to ${transaction.address} with ${transaction.amount} ${transaction.network === Network.Scrt ? 'uSCRT' : 'lamports'} failed - ${exMsg}`,
                );
            }

            if (txHash) {
                const isSuccessed = await completeRequest(txHash, transaction.id);
                if (!isSuccessed) {
                    continue;
                }
            } else {
                // ? update tx status as failed at proxy server.
                await failedRequest(transaction.id);
            }
        }

        await sleep(5);
    }
}

main();

// testSendScrt('secret1yfj6fwv33vgunfqzk2a0spn3x39pv4urps5vgp', 90);
