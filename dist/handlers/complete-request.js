"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.failedRequest = exports.completeRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
const logger_1 = __importDefault(require("../utils/logger"));
const signed_memo_1 = require("../modules/signed-memo");
const https = require('https');
const agent = new https.Agent({
    rejectUnauthorized: false
});
const completeRequest = async (txHash, transactionId) => {
    try {
        const signedData = await (0, signed_memo_1.generateSignedMemo)();
        logger_1.default.info(`Complete request - ${txHash}`);
        await axios_1.default.post(`${constants_1.DROPFEE_API_URL}/drop-fee/complete`, {
            ...signedData,
            txHash,
            transactionId
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            httpsAgent: agent
        });
        return true;
    }
    catch (ex) {
        logger_1.default.error(`Complete request failed - ${ex}`);
        return false;
    }
};
exports.completeRequest = completeRequest;
const failedRequest = async (transactionId) => {
    try {
        const signedData = await (0, signed_memo_1.generateSignedMemo)();
        await axios_1.default.post(`${constants_1.DROPFEE_API_URL}/drop-fee/failed`, {
            ...signedData,
            transactionId
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            httpsAgent: agent
        });
        return true;
    }
    catch (ex) {
        logger_1.default.error(`Complete request failed - ${ex}`);
        return false;
    }
};
exports.failedRequest = failedRequest;
//# sourceMappingURL=complete-request.js.map