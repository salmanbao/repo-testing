// @ts-ignore
const prompt = require('prompt-sync')();
const fs = require('fs');
const fsAppend = require('fs/promises');

const KEYS = ['ADMIN_ID', 'VAULT_SOL_KEYPAIR', 'VAULT_SCRT_KEYPAIR'];

const ADMIN_ID = prompt('What is your admin  ID? : ');
const VAULT_SOL_KEYPAIR = prompt('What is your solana private key? : ');
const VAULT_SCRT_KEYPAIR = prompt('What is your Keplr wallet seed phrase? : ');

const params = {
    ADMIN_ID,
    VAULT_SOL_KEYPAIR,
    VAULT_SCRT_KEYPAIR,
};
console.log(params);

/**
 * @param {{ [x: string]: string; ADMIN_ID: string; VAULT_SOL_KEYPAIR: string; VAULT_SCRT_KEYPAIR: string; }} params
 */
function updateEnv(params) {
    fs.readFile('./.env.example', 'utf8', async (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        fs.writeFileSync('./.env', '');

        const rows = data.split('\n');

        for (let one of rows) {
            console.log('index', { line: one });

            if (one.trim() != '') {
                let [key, value] = one.split('=');
                console.log({ key, value });

                if (KEYS.includes(key)) {
                    const line = key + '=' + params[key] + '\n';
                    console.log('Append: ', line);
                    await fsAppend.appendFile('./.env', line);
                } else {
                    const line = key + '=' + value + '\n';
                    console.log('Append: ', line);
                    await fsAppend.appendFile('./.env', line);
                }
            }
        }
    });
}

updateEnv(params);
