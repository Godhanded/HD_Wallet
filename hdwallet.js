var HDKey = require('hdkey')
var BIP39 = require('bip39');
//require('ethutil');

const mnemonic = BIP39.generateMnemonic(); //generates string
console.log(mnemonic);
const seed = BIP39.mnemonicToSeed(mnemonic); //creates seed buffer
console.log(seed);
// generate master private key
const root = HDKey.fromMasterSeed(seed);
const masterPrivateKey = root.privateKey.toString('hex');
console.log(masterPrivateKey);
//generate address node and address
const addrNode = root.derive("m/44'/60'/0'/0/0"); //line 1
const pubKey = ethUtil.privateToPublic(addrNode._privateKey);
const addr = ethUtil.publicToAddress(pubKey).toString('hex');
console.log(addr);
const address = ethUtil.toChecksumAddress(addr);
console.log(address);