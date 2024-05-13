"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const secretjs_1 = require("secretjs");
async function main() {
    const wallet = new secretjs_1.Wallet(constants_1.VAULT_SCRT_KEYPAIR);
    console.log((0, secretjs_1.toBase64)(wallet.publicKey));
}
main();
//# sourceMappingURL=generate-pubkey.js.map