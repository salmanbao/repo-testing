"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const drop_sol_1 = require("./modules/drop-sol");
const drop_scrt_1 = require("./modules/drop-scrt");
const logger_1 = __importDefault(require("./utils/logger"));
const types_1 = require("./types");
const complete_request_1 = require("./handlers/complete-request");
const ping_1 = require("./handlers/ping");
const constants_1 = require("./constants");
async function main() {
    (0, drop_scrt_1.testScrtWallet)();
    (0, drop_sol_1.testSolanaWallet)();
    // Loop requests
    while (true) {
        // ping request
        const response = await (0, ping_1.ping)();
        if (!response) {
            await (0, utils_1.sleep)(30);
            continue;
        }
        if (!response.newRequest || response.nextAdminId != constants_1.ADMIN_ID) {
            await (0, utils_1.sleep)(3);
            continue;
        }
        // Process requests
        for (const transaction of response.newRequest.transactions) {
            if (transaction.status != types_1.ProcessStatus.Pending && transaction.status != types_1.ProcessStatus.Failed) {
                continue;
            }
            let txHash;
            try {
                if (transaction.network === types_1.Network.Solana) {
                    txHash = await (0, drop_sol_1.dropSol)(transaction);
                }
                else if (transaction.network === types_1.Network.Scrt) {
                    txHash = await (0, drop_scrt_1.dropScrt)(transaction);
                }
                logger_1.default.info(`Drop fee to ${transaction.address} with ${transaction.amount} ${transaction.network === types_1.Network.Scrt ? 'uSCRT' : 'lamports'} - ${txHash}`);
            }
            catch (ex) {
                console.log('Error at index while drop fee', ex);
                // Update request as failed
                const exMsg = JSON.stringify(ex, null, 2);
                logger_1.default.error(`Drop fee to ${transaction.address} with ${transaction.amount} ${transaction.network === types_1.Network.Scrt ? 'uSCRT' : 'lamports'} failed - ${exMsg}`);
            }
            if (txHash) {
                const isSuccessed = await (0, complete_request_1.completeRequest)(txHash, transaction.id);
                if (!isSuccessed) {
                    continue;
                }
            }
            else {
                //? update tx status as failed at proxy server.
                await (0, complete_request_1.failedRequest)(transaction.id);
            }
        }
        await (0, utils_1.sleep)(5);
    }
}
main();
// testSendScrt('secret1yfj6fwv33vgunfqzk2a0spn3x39pv4urps5vgp', 90);
//# sourceMappingURL=index.js.map