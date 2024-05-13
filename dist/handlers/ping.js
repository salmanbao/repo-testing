"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
const logger_1 = __importDefault(require("../utils/logger"));
const signed_memo_1 = require("../modules/signed-memo");
const https = require("https");
const agent = new https.Agent({
    rejectUnauthorized: false,
});
const ping = async () => {
    var _a;
    try {
        const signedData = await (0, signed_memo_1.generateSignedMemo)();
        console.log({ signedData });
        logger_1.default.info(`Send ping request`);
        console.log("send ping request");
        const { data: resp } = await axios_1.default.post(`${constants_1.DROPFEE_API_URL}/admin/ping`, signedData, {
            headers: {
                "Content-Type": "application/json",
            },
            httpsAgent: agent,
        });
        console.log("resp", { resp });
        const response = resp.data;
        return response;
    }
    catch (ex) {
        console.log("EXception at ping:", { ex, 'res': (_a = ex === null || ex === void 0 ? void 0 : ex.response) === null || _a === void 0 ? void 0 : _a.data });
        logger_1.default.error(`Ping request failed - ${ex}`);
        return null;
    }
};
exports.ping = ping;
//# sourceMappingURL=ping.js.map