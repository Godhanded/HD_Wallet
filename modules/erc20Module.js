const ethers = require('ethers');
require('dotenv').config()

const url= process.env.RPCURL;
const provider = new ethers.providers.JsonRpcProvider(url);
//------------------------------ERC20--------------------------

const USDTaddress='0x058925943B2Ae8e6AeA2796f1F3De4997d125741'
const abi = require('../ERC20abi.json');

const USDT= new ethers.Contract(USDTaddress,abi,provider);
let mnemonics2=process.env.SEED;
let neww= ethers.Wallet.fromMnemonic(mnemonics2, "m/44'/60'/0'/0/0");
const signer = new ethers.Wallet(neww.privateKey,provider);
console.log(neww.address);
 (async()=>
 {
    let tx= await USDT.balanceOf(neww.address)
    console.log();
    console.log();
    console.log();
    let tx2= await USDT.connect(signer).transfer('0xAa6b29B488b986d4E5ED94eF0DC24581f2CF26D9',ethers.utils.parseUnits('5'));
    console.log('erc20: ',ethers.utils.formatUnits(tx),tx2,tx2.hash);
 })();

 async function getBalance(_address)
 {
    let balance= await USDT.balanceOf(_adresss);
    return ethers.utils.formatUnits(balance);
 }

 async function sendErc20(_contractAddr, _privateKey, _to, _value)
 {
    try{
    const token= new ethers.Contract(_contractAddr,abi,provider);
    const signer= new ethers.Wallet(_privateKey,provider);
    let value = ethers.utils.parseUnits(`${_value}`);
    let sendTx= await token.connect(signer).transfer(_to,value);
    return {"success":true,
            "txHash":sendTx.hash,
            "to":_to,
            "value":_value
        };  
    }catch (error){
        console.log(error);
        process.exit(1);
    }
 }

 /**
██████╗  ██████╗ ██████╗  █████╗ ███╗   ██╗██████╗ 
██╔════╝ ██╔═══██╗██╔══██╗██╔══██╗████╗  ██║██╔══██╗
██║  ███╗██║   ██║██║  ██║███████║██╔██╗ ██║██║  ██║
██║   ██║██║   ██║██║  ██║██╔══██║██║╚██╗██║██║  ██║
╚██████╔╝╚██████╔╝██████╔╝██║  ██║██║ ╚████║██████╔╝
 ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ 
                                                    
 */