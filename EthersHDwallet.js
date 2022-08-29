/**
██████╗  ██████╗ ██████╗  █████╗ ███╗   ██╗██████╗ 
██╔════╝ ██╔═══██╗██╔══██╗██╔══██╗████╗  ██║██╔══██╗
██║  ███╗██║   ██║██║  ██║███████║██╔██╗ ██║██║  ██║
██║   ██║██║   ██║██║  ██║██╔══██║██║╚██╗██║██║  ██║
╚██████╔╝╚██████╔╝██████╔╝██║  ██║██║ ╚████║██████╔╝
 ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ 
                                                    
 */
const bip39 = require("bip39");
const { ethers } = require("ethers");
require("dotenv").config();
// const hdkey = require('hdkey');
// const ethUtil = require('ethereumjs-util');
let count = false;
console.log();
let mnemonic;

const url = process.env.RPCURL;
const provider = new ethers.providers.JsonRpcProvider(url);

function generateRandomHDNode() {
  if (!count) {
    const mnemonics = bip39.generateMnemonic(256);
    mnemonic = mnemonics;
    let masterNode = ethers.utils.HDNode.fromMnemonic(mnemonics);
    console.log(masterNode);
    return masterNode.privateKey;
  } else {
    return "already have a node";
  }
}

console.log(generateRandomHDNode());

function restoreHDWallet(mnemonics, index) {
  return ethers.Wallet.fromMnemonic(mnemonics, `m/44'/60'/0'/0/${index}`);
}

console.log(restoreHDWallet(mnemonic, 4));
console.log();
console.log();

let derivationPath = {
  ethereum: "m/44'/60'/0'/0",
  bsc: "m/44'/9006'/0'/0",
  polygon: "m/44'/966'/0'/0",
  Tron: "m/44'/195'/0'/0",
};
let lastDerivation = 0;

function deriveWallet(_mnemonic, _derivationPath) {
  let wallets = [];

  for (let i = 0; i < 2; i++) {
    let hdNode = ethers.utils.HDNode.fromMnemonic(_mnemonic).derivePath(
      _derivationPath + "/" + i
    );
    //console.log(hdNode);
    let wallet = new ethers.Wallet(hdNode.privateKey);
    wallets.push(wallet);
  }
  //lastDerivation=(lastDerivation + 2)-1;
  return wallets;
}
console.log("eth: ", deriveWallet(mnemonic, derivationPath.ethereum));
console.log();
console.log();
console.log("bsc: ", deriveWallet(mnemonic, derivationPath.bsc));
console.log();
console.log();
console.log("polygon: ", deriveWallet(mnemonic, derivationPath.polygon));

console.log();

async function signTx(wallet, _to, _value) {
  let nonce = await wallet.getTransactionCount();
  let transaction = {
    //nonce:nonce,
    //gasLimit: 25000,
    to: _to,
    value: ethers.utils.parseEther(_value),
    //data: "0x",
  };
  console.log(ethers.utils.formatEther(await wallet.getBalance()));
  try {
    let tx = await wallet.sendTransaction(transaction);
    let receipt = await tx.wait(1);
    if (receipt.blockNumber) {
      return {
        succes: true,
        to: receipt.to,
        from: receipt.from,
        value: _value,
        hash: receipt.transactionHash,
        gasUsed: receipt.gasUsed.toString(),
      };
    }
  } catch (error) {
    return {
      success: false,
      errors: error.reason,
    };
  }
}

const test = process.env.SEED;
let wallets = deriveWallet(test, derivationPath.ethereum);
let wallet = wallets[0];

wallet = wallet.connect(provider);

console.log();
console.log();
console.log();
let recipient = "0x2D3780568E72EE39137b4D5b49f585fe559410Dc";
let value = "0.00000009";

// (async () => {
//   let signedTx = await signTx(wallet, recipient, value);
//   console.log("signed tx: ", signedTx);
// })();
console.log();
console.log();

//------------------------------ERC20--------------------------

const USDTaddress = "0x058925943B2Ae8e6AeA2796f1F3De4997d125741";
const abi = require("./ERC20abi.json");

const USDT = new ethers.Contract(USDTaddress, abi, provider);
let mnemonics2 = process.env.SEED;
let neww = ethers.Wallet.fromMnemonic(mnemonics2, "m/44'/60'/0'/0/0");
const signer = new ethers.Wallet(neww.privateKey, provider);
console.log(neww.address);
let erc20 = async () => {
  console.log();
  console.log();
  console.log();
  try {
    let tx2 = await USDT.connect(signer).transfer(
      "0xAa6b29B488b986d4E5ED94eF0DC24581f2CF26D9",
      ethers.utils.parseUnits("0")
    );
    let tx2Result = await tx2.wait(1);
    //console.log('erc20: ',ethers.utils.formatUnits(tx),tx2Result);
    const [a, b, c] = tx2Result.events.find(
      (event) => event.event === "Transfer"
    ).args;
    return {
      succes: true,
      hash: tx2Result.transactionHash,
      gasUsed: tx2Result.gasUsed.toString(),
      events: {
        from: a,
        to: b,
        value: c.toString(),
      },
    };
  } catch (error) {
    return {
      succes: false,
      error: error.reason,
    };
  }
};

let runerc = async () => {
  try {
    console.log(await erc20());
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
//uncomment after commenting coin transfer section(wont run erc20 and coin at same time)
//runerc()
