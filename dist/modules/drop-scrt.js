"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSendScrt = exports.testScrtWallet = exports.dropScrt = void 0;
const secretjs_1 = require("secretjs");
const constants_1 = require("../constants");
const bytes_1 = require("@project-serum/anchor/dist/cjs/utils/bytes");
const dropScrt = async (transaction) => {
    // Load wallet informations
    const vaultWallet = new secretjs_1.Wallet(constants_1.VAULT_SCRT_KEYPAIR);
    const userAddress = transaction.address;
    const scrtAmount = Math.ceil(transaction.amount * 1000000).toString();
    // Transfer SCRT from vault to requester
    const secretJs = new secretjs_1.SecretNetworkClient({
        url: constants_1.SCRT_RPC_URL,
        chainId: constants_1.SCRT_CHAIN_ID,
        wallet: vaultWallet,
        walletAddress: vaultWallet.address
    });
    const msg = new secretjs_1.MsgSend({
        from_address: vaultWallet.address,
        to_address: userAddress,
        amount: [
            {
                denom: 'uscrt',
                amount: scrtAmount
            }
        ]
    });
    const tx = await secretJs.tx.broadcast([msg], {
        gasLimit: 20000,
        gasPriceInFeeDenom: 0.1,
        feeDenom: 'uscrt'
    });
    if (tx.code != 0) {
        console.error('Error at secretJs.tx.broadcast : ', { msg, tx });
        throw Error(`Errorcode: ${tx.code}`);
    }
    return tx.transactionHash;
};
exports.dropScrt = dropScrt;
const testScrtWallet = async () => {
    const vaultSecretWallet = new secretjs_1.Wallet(constants_1.VAULT_SCRT_KEYPAIR);
    console.log('vaultSecretWallet:', { address: vaultSecretWallet.address, pubKey: bytes_1.base64.encode(Buffer.from(vaultSecretWallet.publicKey)) });
};
exports.testScrtWallet = testScrtWallet;
const testSendScrt = async (receiver, amount) => {
    const vaultWallet = new secretjs_1.Wallet(constants_1.VAULT_SCRT_KEYPAIR);
    const userAddress = receiver;
    const scrtAmount = Math.ceil(amount * 1000000).toString();
    // Transfer SCRT from vault to requester
    const secretJs = new secretjs_1.SecretNetworkClient({
        url: constants_1.SCRT_RPC_URL,
        chainId: constants_1.SCRT_CHAIN_ID,
        wallet: vaultWallet,
        walletAddress: vaultWallet.address
    });
    const msg = new secretjs_1.MsgSend({
        from_address: vaultWallet.address,
        to_address: userAddress,
        amount: [
            {
                denom: 'uscrt',
                amount: scrtAmount
            }
        ]
    });
    const tx = await secretJs.tx.broadcast([msg], {
        gasLimit: 20000,
        gasPriceInFeeDenom: 0.1,
        feeDenom: 'uscrt'
    });
    if (tx.code != 0) {
        console.error('Error at secretJs.tx.broadcast : ', { msg, tx });
        throw Error(`Errorcode: ${tx.code}`);
    }
    return tx.transactionHash;
};
exports.testSendScrt = testSendScrt;
//# sourceMappingURL=drop-scrt.js.map