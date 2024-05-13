import { base64 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { MsgSend, SecretNetworkClient, Wallet } from 'secretjs';
import { SCRT_CHAIN_ID, SCRT_RPC_URL, VAULT_SCRT_KEYPAIR } from '../constants';
import { DropTransaction } from '../models';

export const dropJKL = async (transaction: DropTransaction) => {
    // Load wallet informations
    const vaultWallet = new Wallet(VAULT_SCRT_KEYPAIR);
    const userAddress = transaction.address;
    const scrtAmount = Math.ceil(transaction.amount * 1_000_000).toString();

    // Transfer SCRT from vault to requester
    const secretJs = new SecretNetworkClient({
        url: SCRT_RPC_URL,
        chainId: SCRT_CHAIN_ID,
        wallet: vaultWallet,
        walletAddress: vaultWallet.address,
    });

    const msg = new MsgSend({
        from_address: vaultWallet.address,
        to_address: userAddress,
        amount: [
            {
                denom: 'uscrt',
                amount: scrtAmount,
            },
        ],
    });

    const tx = await secretJs.tx.broadcast([msg], {
        gasLimit: 20_000,
        gasPriceInFeeDenom: 0.1,
        feeDenom: 'uscrt',
    });
    if (tx.code != 0) {
        throw Error(`Errorcode: ${tx.code}`);
    }

    return tx.transactionHash;
};

export const testScrtWallet = async () => {
    const vaultSecretWallet = new Wallet(VAULT_SCRT_KEYPAIR);
    console.log('vaultSecretWallet:', {
        address: vaultSecretWallet.address,
        pubKey: base64.encode(Buffer.from(vaultSecretWallet.publicKey)),
    });
};
