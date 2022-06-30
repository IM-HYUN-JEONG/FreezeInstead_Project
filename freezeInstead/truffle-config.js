/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * https://trufflesuite.com/docs/truffle/reference/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

//const HDWalletProvider = require("@truffle/hdwallet-provider");
const infuraKey = "a4988ed6202f4083881974aa123c53af";
const fs = require("fs");
// const mnemonic = fs.readFileSync(".secret").toString().trim();

const account = "0x83565088DC95Af0C5BC1DA6F029F7525dFaA5a87";
const privateKeys = [
  "aaeed97eecdf7c9a0f3f1e0d0cb9fa9cc44f2102c1c10eabda9c317b9f97d9c9",
];
const mnemonic =
  "over exclude chuckle staff shallow matter learn someone keen assist vocal adapt";

/* KLAYTN NETWORK */
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const BAOBAB_NETWORK_ID = "1001"; //baobab
const BAOBAB_URL = "https://api.baobab.klaytn.net:8651"; //baobab
const BAOBAB_PRIVATE_KEY =
  "0xee74b0a5eeb2be0e0bb8eca39a820fe38c7f463e9e58ff31b83b9982b2fb716e";

const MAINNET_NETWORK_ID = "8217"; //mainnet
const MAINNET_URL = "https://klaytn04.fandom.finance/"; //mainnet
const MAINNET_PRIVATE_KEY =
  "0xcd7cf43262a1cb23861061af30c02a514ff47298925521d03d8d798aab3040bd";

const GASLIMIT = "8500000";
//const GASLIMIT = "1500000";
//const GASLIMIT = "4000000";

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
      host: "127.0.0.1", // Localhost (default: none) //127.0.0.1
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    // Another network with more advanced options...
    // advanced: {
    // port: 8777,             // Custom port
    // network_id: 1342,       // Custom network
    // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
    // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    // from: <address>,        // Account to send txs from (default: accounts[0])
    // websocket: true        // Enable EventEmitter interface for web3 (default: false)
    // },
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    // ropsten: {
    //   provider: () =>
    //     new HDWalletProvider(
    //       privateKeys,
    //       `wss://ropsten.infura.io/ws/v3/${infuraKey}`
    //     ),
    //   network_id: 3, // Ropsten's id
    //   gas: 5500000, // Ropsten has a lower block limit than mainnet
    //   confirmations: 2, // # of confs to wait between deployments. (default: 0)
    //   timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
    //   skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    // },
    // Useful for private networks
    // private: {
    // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    // network_id: 2111,   // This network is yours, in the cloud.
    // production: true    // Treats this network as if it was a public net. (default: false)
    // }
    // Configuration for mainnet
    // mainnet: {
    //   networkCheckTimeout: 10000,
    //   provider: function () {
    //     // Setting the provider with the Infura Mainnet address and Token
    //     return new HDWalletProvider(
    //       mnemonic,
    //       "https://mainnet.infura.io/v3/${infuraKey}"
    //     );
    //   },
    //   network_id: "1",
    // },
    // Configuration for rinkeby network
    // rinkeby: {
    //   // Special function to setup the provider
    //   provider: function () {
    //     // Setting the provider with the Infura Rinkeby address and Token
    //     return new HDWalletProvider(
    //       mnemonic,
    //       "wss://rinkeby.infura.io/ws/v3/${infuraKey}"
    //     );
    //   },
    //   // Network id is 4 for Rinkeby
    //   network_id: "4",
    //   //networkCheckTimeout: 1000000,
    //   timeoutBlocks: 200,
    //   gas: 6500000,
    //   gasPrice: 100000000000,
    // },
    baobab: {
      provider: () => new HDWalletProvider(BAOBAB_PRIVATE_KEY, BAOBAB_URL),
      network_id: BAOBAB_NETWORK_ID,
      gas: GASLIMIT,
      gasPrice: null,
    },
    mainnet: {
      provider: () => new HDWalletProvider(MAINNET_PRIVATE_KEY, MAINNET_URL), //https://public-node-api.klaytnapi.com/v1/cypress
      network_id: MAINNET_NETWORK_ID, //8217
      gas: GASLIMIT, //8500000
      gasPrice: null,
      networkCheckTimeout: 10000,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.4", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  // enabled: false,
  // host: "127.0.0.1",
  // adapter: {
  //   name: "sqlite",
  //   settings: {
  //     directory: ".db"
  //   }
  // }
  // }
};
