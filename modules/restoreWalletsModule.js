const { ethers } = require('ethers');

function restoreHDWallet(mnemonics,index) 
{
    return ethers.Wallet.fromMnemonic(mnemonics, `m/44'/60'/0'/0/${index}`);
}

//------------TEST--------------------
console.log(restoreHDWallet(mnemonic,4));
//-------------END_TEST---------------

 /**
██████╗  ██████╗ ██████╗  █████╗ ███╗   ██╗██████╗ 
██╔════╝ ██╔═══██╗██╔══██╗██╔══██╗████╗  ██║██╔══██╗
██║  ███╗██║   ██║██║  ██║███████║██╔██╗ ██║██║  ██║
██║   ██║██║   ██║██║  ██║██╔══██║██║╚██╗██║██║  ██║
╚██████╔╝╚██████╔╝██████╔╝██║  ██║██║ ╚████║██████╔╝
 ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ 
                                                    
 */