import { Wallet, toBase64 } from 'secretjs';
import { VAULT_SCRT_KEYPAIR } from './constants';

async function main() {
    const wallet = new Wallet(VAULT_SCRT_KEYPAIR);
    console.log(toBase64(wallet.publicKey));
}

main();
