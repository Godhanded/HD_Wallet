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