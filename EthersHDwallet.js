const ethers = require('ethers');

console.log();

function generateMnemonic() {
    let randomEntropyBytes = ethers.utils.randomBytes(16);
    return ethers.utils.HDNode.entropyToMnemonic(randomEntropyBytes);
}

function generateRandomHDNode() {
    let mnemonic = generateMnemonic();
    return ethers.utils.HDNode.fromMnemonic(mnemonic);
}

console.log(generateRandomHDNode());