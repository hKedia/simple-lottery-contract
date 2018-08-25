const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// setting up provider with account mnemonic and infura node url
const provider = new HDWalletProvider(
    'either amused raven divert claim ivory shallow flag fever flight mail much',
    'Your rinkeby node url'
);

const web3 = new Web3(provider);

// creating below function to use async/await
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);
    
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: '0x' + bytecode})
        .send({ from: accounts[0], gas: '1000000'});

    console.log('Contract deployed to', result.options.address);
};
deploy();