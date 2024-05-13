import { Keypair } from '@solana/web3.js';
import base58 from 'bs58';
import md5 from 'md5';
import { Wallet } from 'secretjs';

import * as anchor from '@project-serum/anchor';
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { sign } from 'tweetnacl';
import { ADMIN_ID, SCRT_CHAIN_ID, VAULT_SCRT_KEYPAIR, VAULT_SOL_KEYPAIR } from '../constants';
import { generateNonce } from '../utils';

export const generateSignedMemo = async () => {
    const nonce = generateNonce(6);

    // Load wallet informations
    const solWallet = new anchor.Wallet(Keypair.fromSecretKey(base58.decode(VAULT_SOL_KEYPAIR)));
    const scrtWallet = new Wallet(VAULT_SCRT_KEYPAIR);

    // Make solana memo
    const solMemo = `Verify SerenityShield Solana wallet: adminId - ${ADMIN_ID}, wallet - ${solWallet.publicKey.toString()}, nonce - ${nonce}`;
    const solMemoBytes = new TextEncoder().encode(solMemo);
    const signedSolana = bs58.encode(sign.detached(solMemoBytes, solWallet.payer.secretKey));

    // Make scrt memo
    const scrtMemo = `Verify SerenityShield SCRT wallet: adminId - ${ADMIN_ID}, wallet - ${scrtWallet.address.toString()}, nonce - ${nonce}`;
    const accounts = await scrtWallet.getAccounts();
    const accountNumber = accounts[0].address;
    const sequence = md5(Math.random().toString(36).slice(-8));

    const signedScrt = (
        await scrtWallet.signAmino(scrtWallet.address, {
            chain_id: SCRT_CHAIN_ID,
            account_number: accountNumber,
            sequence,
            fee: {
                gas: '1',
                amount: [{ denom: 'uscrt', amount: '0' }],
            },
            msgs: [
                {
                    type: 'verify-memo',
                    value: scrtMemo,
                },
            ],
            memo: nonce,
        })
    ).signature.signature;

    return {
        adminId: ADMIN_ID,
        nonce,
        sequence,
        signedScrt,
        signedSolana,
    };
};
