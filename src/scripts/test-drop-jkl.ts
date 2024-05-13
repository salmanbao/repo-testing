import { base64 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { MsgSend, SecretNetworkClient, Wallet } from 'secretjs';
import { JKL_CHAIN_ID, JKL_RPC_URL, VAULT_SCRT_KEYPAIR } from '../constants';

const SENDER = 'jkl1j9w8rrgf42kjm0jzyuakcdqtuqsllm8ru8dwwu';
const Receiver = 'jkl1zck7ms477h4lfn4tmjr8fztx3f7qs02x2t4dwm';

export const dropJKL = async () => {
    // Load wallet informations
    const userAddress = Receiver;
    const vaultWallet = new Wallet(VAULT_SCRT_KEYPAIR);
    const jklAmount = Math.ceil(10 * 1_000_000).toString();

    // Transfer SCRT from vault to requester
    const secretJs = new SecretNetworkClient({
        url: JKL_RPC_URL,
        chainId: JKL_CHAIN_ID,
        wallet: vaultWallet,
        walletAddress: SENDER, // vaultWallet.address
    });

    const msg = new MsgSend({
        from_address: SENDER, // vaultWallet.address,
        to_address: userAddress,
        amount: [
            {
                denom: 'ibc/B6E97E0FB88FF4660A677B27CE0CD03E5F74E0DE1B9D2B65F107249A3CE5C8FB',
                amount: jklAmount,
            },
        ],
    });
    console.log('Sending transaction to transfer JKL token ....', JSON.stringify(msg, null, 2));
    const tx = await secretJs.tx.broadcast([msg], {
        gasLimit: 20_000,
        gasPriceInFeeDenom: 0.1,
        feeDenom: 'ibc/B6E97E0FB88FF4660A677B27CE0CD03E5F74E0DE1B9D2B65F107249A3CE5C8FB',
    });

    console.log('Result of transaction to transfer JKL token.', { tx });

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

dropJKL();
