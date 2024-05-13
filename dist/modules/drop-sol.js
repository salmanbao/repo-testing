"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSolanaWallet = exports.dropSol = void 0;
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const constants_1 = require("../constants");
const dropSol = async (transaction) => {
    // Load wallet informations
    const vaultWallet = web3_js_1.Keypair.fromSecretKey(bs58_1.default.decode(constants_1.VAULT_SOL_KEYPAIR));
    const userAddress = new web3_js_1.PublicKey(transaction.address);
    const lamports = Math.ceil(web3_js_1.LAMPORTS_PER_SOL * transaction.amount);
    // Transfer SOL from vault to requester
    const connection = new web3_js_1.Connection(constants_1.SOLANA_RPC_URL, {
        commitment: 'confirmed'
    });
    const tx = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.transfer({
        fromPubkey: vaultWallet.publicKey,
        toPubkey: userAddress,
        lamports
    }));
    const txHash = await connection.sendTransaction(tx, [vaultWallet], {
        maxRetries: 10,
        preflightCommitment: 'confirmed',
    });
    return txHash;
};
exports.dropSol = dropSol;
const testSolanaWallet = async () => {
    const vaultSolanaWallet = web3_js_1.Keypair.fromSecretKey(bs58_1.default.decode(constants_1.VAULT_SOL_KEYPAIR));
    console.log('vaultSolanaWallet: ', { pubKey: vaultSolanaWallet.publicKey.toString() });
};
exports.testSolanaWallet = testSolanaWallet;
//# sourceMappingURL=drop-sol.js.map