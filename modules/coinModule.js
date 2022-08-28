const { ethers } = require("ethers");
require('dotenv').config()

//chain depends on which rpc url you use
const url= process.env.RPCURL;
const provider = new ethers.providers.JsonRpcProvider(url);


async function signTx(walletKey, _to, _value)
{
    try {
        let wallet= new ethers.Wallet(walletKey);
        wallet= wallet.connect(provider)
        let transaction=
            {
                //gasLimit: 25000,
                to: _to,
                value: ethers.utils.parseEther(_value),
                //data: "0x",
            };
            
        let txReceipt= await wallet.sendTransaction(transaction);
        return {
            "success":true,
            "txHash":txReceipt.hash,
            "to":_to,
            "value":_value
            }; 
    }catch (error) {
        console.log(error);
        process.exit(1);
    }
};

async function getBalance(walletKey) {
    let wallet = new ethers.Wallet(walletKey);
    wallet= wallet.connect(provider);
    return ethers.utils.formatEther(await wallet.getBalance());
}

//------------------------TEST---------------------------
//transfer:@Note this fails if balance of wallet is empty
// (async(walletKey)=>
// {
//     let tx=async()=>await signTx("e660b16b47e75238bf62f065df39574816b242ce4120870631825b0d95951a43","0xf977814e90da44bfa03b6295a0616a897441acec","2");
//     console.log("signed tx: ", tx);
// })();

//get balance:
// let balance =async()=>console.log(await getBalance("e660b16b47e75238bf62f065df39574816b242ce4120870631825b0d95951a43"));
// balance();
//----------------------END_TEST------------------------------

 /**
██████╗  ██████╗ ██████╗  █████╗ ███╗   ██╗██████╗ 
██╔════╝ ██╔═══██╗██╔══██╗██╔══██╗████╗  ██║██╔══██╗
██║  ███╗██║   ██║██║  ██║███████║██╔██╗ ██║██║  ██║
██║   ██║██║   ██║██║  ██║██╔══██║██║╚██╗██║██║  ██║
╚██████╔╝╚██████╔╝██████╔╝██║  ██║██║ ╚████║██████╔╝
 ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝                                                   
 */