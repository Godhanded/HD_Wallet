// 4) Derive Keys from HD Wallet

function deriveFiveWalletsFromHdNode(mnemonic, derivationPath) {
    let wallets = [];

        for (let i = 0; i < 5; i++) {
            let hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath(derivationPath + "/" + i);
            console.log(hdNode);
            let wallet = new ethers.Wallet(hdNode.privateKey);
            wallets.push(wallet);
        }
        return wallets;
}

let derivationPath = "m/44'/60'/0'/0";

console.log(deriveFiveWalletsFromHdNode(mnemonic, derivationPath));

// 5) Sign a Transaction

async function signTransaction(wallet, toAddress, value) {
    let transaction = {
        nonce: 0,
        gasLimit: 21000,
        gasPrice: ethers.utils.bigNumberify("2000000000"),
        to: toAddress,
        value: ethers.utils.parseEther(value),
        data: "0x"
    };
    return wallet.sign(transaction);
}

let wallets = deriveFiveWalletsFromHdNode(mnemonic, derivationPath);
let wallet = wallets[1];
let recipient = "0x933b946c4fec43372c5580096408d25b3c7936c5";
let value = "1.0";

(async() => {
    let signedTransaction = await signTransaction(wallet, recipient, value);
    console.log("Signed Transaction:\n" + signedTransaction); })();

console.log();