"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSignedMemo = void 0;
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
const secretjs_1 = require("secretjs");
const md5_1 = __importDefault(require("md5"));
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const anchor = __importStar(require("@project-serum/anchor"));
const tweetnacl_1 = require("tweetnacl");
const bytes_1 = require("@project-serum/anchor/dist/cjs/utils/bytes");
const generateSignedMemo = async () => {
    const nonce = (0, utils_1.generateNonce)(6);
    // Load wallet informations
    const solWallet = new anchor.Wallet(web3_js_1.Keypair.fromSecretKey(bs58_1.default.decode(constants_1.VAULT_SOL_KEYPAIR)));
    const scrtWallet = new secretjs_1.Wallet(constants_1.VAULT_SCRT_KEYPAIR);
    // Make solana memo
    const solMemo = `Verify SerenityShield Solana wallet: adminId - ${constants_1.ADMIN_ID}, wallet - ${solWallet.publicKey.toString()}, nonce - ${nonce}`;
    const solMemoBytes = new TextEncoder().encode(solMemo);
    const signedSolana = bytes_1.bs58.encode(tweetnacl_1.sign.detached(solMemoBytes, solWallet.payer.secretKey));
    // Make scrt memo
    const scrtMemo = `Verify SerenityShield SCRT wallet: adminId - ${constants_1.ADMIN_ID}, wallet - ${scrtWallet.address.toString()}, nonce - ${nonce}`;
    const accounts = await scrtWallet.getAccounts();
    const accountNumber = accounts[0].address;
    const sequence = (0, md5_1.default)(Math.random().toString(36).slice(-8));
    const signedScrt = (await scrtWallet.signAmino(scrtWallet.address, {
        chain_id: constants_1.SCRT_CHAIN_ID,
        account_number: accountNumber,
        sequence,
        fee: {
            gas: '1',
            amount: [{ denom: 'uscrt', amount: '0' }],
        },
        msgs: [{
                type: 'verify-memo',
                value: scrtMemo
            }],
        memo: nonce,
    })).signature.signature;
    return {
        adminId: constants_1.ADMIN_ID,
        nonce,
        sequence,
        signedScrt,
        signedSolana,
    };
};
exports.generateSignedMemo = generateSignedMemo;
//# sourceMappingURL=signed-memo.js.map