import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import base58 from 'bs58';
import { SOLANA_RPC_URL, VAULT_SOL_KEYPAIR } from '../constants';
import { DropTransaction } from '../models';

export const dropSol = async (transaction: DropTransaction) => {
    // Load wallet informations
    const vaultWallet = Keypair.fromSecretKey(base58.decode(VAULT_SOL_KEYPAIR));
    const userAddress = new PublicKey(transaction.address);
    const lamports = Math.ceil(LAMPORTS_PER_SOL * transaction.amount);

    // Transfer SOL from vault to requester
    const connection = new Connection(SOLANA_RPC_URL, {
        commitment: 'confirmed',
    });

    const tx = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: vaultWallet.publicKey,
            toPubkey: userAddress,
            lamports,
        }),
    );

    const txHash = await connection.sendTransaction(tx, [vaultWallet], {
        maxRetries: 10,
        preflightCommitment: 'confirmed',
    });

    return txHash;
};

export const testSolanaWallet = async () => {
    const vaultSolanaWallet = Keypair.fromSecretKey(base58.decode(VAULT_SOL_KEYPAIR));

    console.log('vaultSolanaWallet: ', { pubKey: vaultSolanaWallet.publicKey.toString() });
};
