const { ethers } = require("ethers");
require("dotenv").config();

//chain depends on which rpc url you use
const url = process.env.RPCURL;
const provider = new ethers.providers.JsonRpcProvider(url);

//------------------------------ERC20--------------------------

const abi = require("../ERC20abi.json");

async function getBalance(_address) {
  let balance = await USDT.balanceOf(_adresss);
  return ethers.utils.formatUnits(balance);
}

async function sendErc20(_contractAddr, _privateKey, _to, _value) {
  try {
    const token = new ethers.Contract(_contractAddr, abi, provider);
    const signer = new ethers.Wallet(_privateKey, provider);
    let value = ethers.utils.parseUnits(`${_value}`);
    let sendTx = await token.connect(signer).transfer(_to, value);
    let txReceipt = await sendTx.wait(7);
    const [a, b, c] = txReceipt.events.find(
      (event) => event.event === "Transfer"
    ).args;
    return {
      succes: true,
      hash: txReceipt.transactionHash,
      gasUsed: txReceipt.gasUsed.toString(),
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
}

//------------------------------ERC20_TEST--------------------------

// const USDTaddress='0x058925943B2Ae8e6AeA2796f1F3De4997d125741'

// const USDT= new ethers.Contract(USDTaddress,abi,provider);
// let mnemonics2=process.env.SEED;
// let neww= ethers.Wallet.fromMnemonic(mnemonics2, "m/44'/60'/0'/0/0");
// const signer = new ethers.Wallet(neww.privateKey,provider);
// console.log(neww.address);
// let erc20=async()=>
// {
//    //let tx= await USDT.balanceOf(neww.address)
//    //let signedTx= await signTx(signer, recipient, value);
//    //console.log("signed tx: ", signedTx);
//    console.log();
//    console.log();
//    console.log();
//    let tx2= await USDT.connect(signer).transfer('0xAa6b29B488b986d4E5ED94eF0DC24581f2CF26D9',ethers.utils.parseUnits('0'));
//    let tx2Result=await tx2.wait(1)
//    //console.log('erc20: ',ethers.utils.formatUnits(tx),tx2Result);
//    const [a,b,c]= tx2Result.events.find(event=>event.event==="Transfer").args
//    return {
//        succes:true,
//        hash:tx2Result.transactionHash,
//        gasUsed:tx2Result.gasUsed.toString(),
//        events:{
//            from:a,
//            to:b,
//            value:c.toString(),
//        }
//    }
// };

// let runerc=async()=>
// {
//    try{
//    console.log(await erc20());
//    process.exit(0);}catch(error){
//        console.log(error);
//        process.exit(1);
//    }
// }
// runerc()

//------------------------------END_TEST--------------------------

/**
██████╗  ██████╗ ██████╗  █████╗ ███╗   ██╗██████╗ 
██╔════╝ ██╔═══██╗██╔══██╗██╔══██╗████╗  ██║██╔══██╗
██║  ███╗██║   ██║██║  ██║███████║██╔██╗ ██║██║  ██║
██║   ██║██║   ██║██║  ██║██╔══██║██║╚██╗██║██║  ██║
╚██████╔╝╚██████╔╝██████╔╝██║  ██║██║ ╚████║██████╔╝
 ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ 
                                                    
 */
