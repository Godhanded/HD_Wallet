const params = {
    nonce: 0,
    to: '0x4584158529818ef77D1142bEeb0b6648BD8eDb2f',
    value: '0.1',
    gasPrice: 5000000000,
    gasLimit: 21000,
    chainId: 3
  };
  
  const tx = new ethTx(params);
  //Signing the transaction with the correct private key
  tx.sign(addrNode._privateKey);
  const serializedTx = tx.serialize()
  
  const web3 = new Web3(
    new Web3.providers.HttpProvider('http://localhost:8545')
  );
  //Verify connection is successful
  web3.eth.net.isListening()
    .then(() => console.log('is connected'))
    .catch(e => console.log('Wow. Something went wrong'));
  
    Web3.eth.sendSignedTransaction(
      `0x${serializedTx.toString('hex')}`, 
      (error, result) => { 
         if (error) { console.log(`Error: ${error}`); }  
         else { console.log(`Result: ${result}`); } 
      } 
   );