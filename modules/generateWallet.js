const { ethers } = require("ethers");
require('dotenv').config();

const mnemonic=process.env.SEED

let derivationPath= {
    ethereum: "m/44'/60'/0'/0",
    bsc: "m/44'/9006'/0'/0",
    polygon: "m/44'/966'/0'/0",
    Tron: "m/44'/195'/0'/0",
};

function deriveWallet(_mnemonic, _derivationPath)
{
    let wallets = [];

    for (let i = 0; i < (2); i++) {
        let hdNode = ethers.utils.HDNode.fromMnemonic(_mnemonic).derivePath(_derivationPath + "/" + i);
        let wallet = new ethers.Wallet(hdNode.privateKey);
        wallets.push(wallet);
    }
    return wallets;
}

//----------------------TEST----------------------
// console.log("eth: ",deriveWallet(mnemonic,derivationPath.ethereum));
// console.log()
// console.log()
// console.log("bsc: ",deriveWallet(mnemonic,derivationPath.bsc));
// console.log()
// console.log()
// console.log("polygon: ",deriveWallet(mnemonic,derivationPath.polygon));
//---------------------------END_TEST-----------------

 /**
██████╗  ██████╗ ██████╗  █████╗ ███╗   ██╗██████╗ 
██╔════╝ ██╔═══██╗██╔══██╗██╔══██╗████╗  ██║██╔══██╗
██║  ███╗██║   ██║██║  ██║███████║██╔██╗ ██║██║  ██║
██║   ██║██║   ██║██║  ██║██╔══██║██║╚██╗██║██║  ██║
╚██████╔╝╚██████╔╝██████╔╝██║  ██║██║ ╚████║██████╔╝
 ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ 
                                                    
 */