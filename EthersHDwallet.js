const bip39 = require('bip39');
const ethers = require('ethers');
// const hdkey = require('hdkey');
// const ethUtil = require('ethereumjs-util');
let count = false;
console.log();
let mnemonic;

function generateRandomHDNode() 
{
    if(!count)
    {
    const mnemonics= bip39.generateMnemonic(256);
    mnemonic = mnemonics;
    let masterNode=ethers.utils.HDNode.fromMnemonic(mnemonics);console.log(masterNode);
    return masterNode.privateKey;
    }else{
        return 'already have a node';
    }
}

console.log(generateRandomHDNode());

// function restoreHDWallet(mnemonics) 
// {
//     return ethers.Wallet.fromMnemonic(mnemonics, "m/44'/60'/0'/0/0");
// }

// console.log(restoreHDWallet(mnemonic));
console.log();

let derivationPath= "m/44'/60'/0'/0";
let lastDerivation=0;

function deriveWallet(_mnemonic, _derivationPath)
{
    let wallets = [];

        for (let i = lastDerivation; i < (lastDerivation + 2); i++) {
            let hdNode = ethers.utils.HDNode.fromMnemonic(_mnemonic).derivePath(_derivationPath + "/" + i);
            console.log(hdNode);
            let wallet = new ethers.Wallet(hdNode.privateKey);
            wallets.push(wallet);
        }
        lastDerivation=(lastDerivation + 2)-1;
        return wallets;
}console.log(deriveWallet(mnemonic,derivationPath));

console.log();

async function signTx(wallet, _to, _value)
{
    let transaction=
        {
            gasLimit: 25000,
            to: _to,
            value: ethers.utils.parseEther(_value),
            data: "0x",
        };
    return wallet.sign(transaction);
}

let wallets = deriveWallet(mnemonic, derivationPath);
let wallet = wallets[1];
let recipient = "0x933b946c4fec43372c5580096408d25b3c7936c5";
let value = "1.0";

(async()=>
{
    let signedTx= await signTx(wallet, recipient, value);
    console.log(signedTx);
})();
console.log();