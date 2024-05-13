export const sleep = async (seconds: number) => {
    await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const generateNonce = (length = 6) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let nonce = '';

    for (let i = 0; i < length; i++) {
        nonce += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return nonce;
};
