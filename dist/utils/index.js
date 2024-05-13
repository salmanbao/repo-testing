"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNonce = exports.sleep = void 0;
const sleep = async (seconds) => {
    await new Promise(resolve => setTimeout(resolve, seconds * 1000));
};
exports.sleep = sleep;
const generateNonce = (length = 6) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let nonce = '';
    for (let i = 0; i < length; i++) {
        nonce += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return nonce;
};
exports.generateNonce = generateNonce;
//# sourceMappingURL=index.js.map