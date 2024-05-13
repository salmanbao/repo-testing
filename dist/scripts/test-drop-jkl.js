"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testScrtWallet = exports.dropJKL = void 0;
const secretjs_1 = require("secretjs");
const constants_1 = require("../constants");
const bytes_1 = require("@project-serum/anchor/dist/cjs/utils/bytes");
const SENDER = 'jkl1j9w8rrgf42kjm0jzyuakcdqtuqsllm8ru8dwwu';
const Receiver = 'jkl1zck7ms477h4lfn4tmjr8fztx3f7qs02x2t4dwm';
const dropJKL = async () => {
    // Load wallet informations
    const userAddress = Receiver;
    const vaultWallet = new secretjs_1.Wallet(constants_1.VAULT_SCRT_KEYPAIR);
    const jklAmount = Math.ceil(10 * 1000000).toString();
    // Transfer SCRT from vault to requester
    const secretJs = new secretjs_1.SecretNetworkClient({
        url: constants_1.JKL_RPC_URL,
        chainId: constants_1.JKL_CHAIN_ID,
        wallet: vaultWallet,
        walletAddress: SENDER // vaultWallet.address
    });
    const msg = new secretjs_1.MsgSend({
        from_address: SENDER,
        to_address: userAddress,
        amount: [
            {
                denom: 'ibc/B6E97E0FB88FF4660A677B27CE0CD03E5F74E0DE1B9D2B65F107249A3CE5C8FB',
                amount: jklAmount
            }
        ]
    });
    console.log('Sending transaction to transfer JKL token ....', JSON.stringify(msg, null, 2));
    const tx = await secretJs.tx.broadcast([msg], {
        gasLimit: 20000,
        gasPriceInFeeDenom: 0.1,
        feeDenom: 'ibc/B6E97E0FB88FF4660A677B27CE0CD03E5F74E0DE1B9D2B65F107249A3CE5C8FB'
    });
    console.log('Result of transaction to transfer JKL token.', { tx });
    if (tx.code != 0) {
        throw Error(`Errorcode: ${tx.code}`);
    }
    return tx.transactionHash;
};
exports.dropJKL = dropJKL;
const testScrtWallet = async () => {
    const vaultSecretWallet = new secretjs_1.Wallet(constants_1.VAULT_SCRT_KEYPAIR);
    console.log('vaultSecretWallet:', { address: vaultSecretWallet.address, pubKey: bytes_1.base64.encode(Buffer.from(vaultSecretWallet.publicKey)) });
};
exports.testScrtWallet = testScrtWallet;
(0, exports.dropJKL)();
//# sourceMappingURL=test-drop-jkl.js.map