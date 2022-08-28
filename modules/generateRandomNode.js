const bip39 = require('bip39');

let mnemonic;


function generateRandomHDNode() 
{
    const mnemonics= bip39.generateMnemonic(256);
    mnemonic = mnemonics;
    let masterNode=ethers.utils.HDNode.fromMnemonic(mnemonics);console.log(masterNode);
    return masterNode.privateKey;
}

//--------------TEST-----------------
//console.log(generateRandomHDNode());
//---------------END_TEST--------------
 
 /**
██████╗  ██████╗ ██████╗  █████╗ ███╗   ██╗██████╗ 
██╔════╝ ██╔═══██╗██╔══██╗██╔══██╗████╗  ██║██╔══██╗
██║  ███╗██║   ██║██║  ██║███████║██╔██╗ ██║██║  ██║
██║   ██║██║   ██║██║  ██║██╔══██║██║╚██╗██║██║  ██║
╚██████╔╝╚██████╔╝██████╔╝██║  ██║██║ ╚████║██████╔╝
 ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ 
                                                    
 */