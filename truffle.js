var secret = require("./secret");
var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    networks: {
        ropsten: {
            provider: new HDWalletProvider(secret.mnemonic, "https://ropsten.infura.io/" + secret.infuraToken),
            network_id: '3',
            gas: 4000000,
            gasPrice: 20000000000 // 20 gwei
        },
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network id
        }
    }
};
