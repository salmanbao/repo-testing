"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_ID = exports.DROPFEE_API_URL = exports.VAULT_SCRT_KEYPAIR = exports.VAULT_SOL_KEYPAIR = exports.JKL_CHAIN_ID = exports.JKL_RPC_URL = exports.SCRT_CHAIN_ID = exports.SCRT_RPC_URL = exports.SOLANA_RPC_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.SOLANA_RPC_URL = (_a = process.env.SOLANA_RPC_URL) !== null && _a !== void 0 ? _a : "";
exports.SCRT_RPC_URL = (_b = process.env.SCRT_RPC_URL) !== null && _b !== void 0 ? _b : "";
exports.SCRT_CHAIN_ID = (_c = process.env.SCRT_CHAIN_ID) !== null && _c !== void 0 ? _c : "";
exports.JKL_RPC_URL = (_d = process.env.JKL_RPC_URL) !== null && _d !== void 0 ? _d : "";
exports.JKL_CHAIN_ID = (_e = process.env.JKL_CHAIN_ID) !== null && _e !== void 0 ? _e : "";
exports.VAULT_SOL_KEYPAIR = (_f = process.env.VAULT_SOL_KEYPAIR) !== null && _f !== void 0 ? _f : "";
exports.VAULT_SCRT_KEYPAIR = (_g = process.env.VAULT_SCRT_KEYPAIR) !== null && _g !== void 0 ? _g : "";
exports.DROPFEE_API_URL = (_h = process.env.DROPFEE_API_URL) !== null && _h !== void 0 ? _h : "";
exports.ADMIN_ID = (_j = process.env.ADMIN_ID) !== null && _j !== void 0 ? _j : "";
//# sourceMappingURL=index.js.map