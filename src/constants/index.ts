import dotenv from 'dotenv';
dotenv.config();

export const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL ?? '';
export const SCRT_RPC_URL = process.env.SCRT_RPC_URL ?? '';
export const SCRT_CHAIN_ID = process.env.SCRT_CHAIN_ID ?? '';

export const JKL_RPC_URL = process.env.JKL_RPC_URL ?? '';
export const JKL_CHAIN_ID = process.env.JKL_CHAIN_ID ?? '';

export const VAULT_SOL_KEYPAIR = process.env.VAULT_SOL_KEYPAIR ?? '';
export const VAULT_SCRT_KEYPAIR = process.env.VAULT_SCRT_KEYPAIR ?? '';

export const DROPFEE_API_URL = process.env.DROPFEE_API_URL ?? '';
export const ADMIN_ID = process.env.ADMIN_ID ?? '';
