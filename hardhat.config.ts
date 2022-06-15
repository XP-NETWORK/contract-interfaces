import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import '@typechain/hardhat';
import {config} from 'dotenv';
config();

const SK:string = process.env.SK!;
const accounts = [SK];

export default {
  solidity: "0.8.13",
  networks: {
    heco_testnet: {
      url: "https://http-testnet.hecochain.com",
      accounts,
    },
    bsc: {
      url: "https://data-seed-prebsc-1-s2.binance.org:8545",
      accounts,
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/182b3d3fb2d14d5fbe7421348624d1ce",
      accounts,
    },
    polygon: {
      url: "https://matic-testnet-archive-rpc.bwarelabs.com",
      accounts,
    },
    fantom: {
      url: "https://rpc.testnet.fantom.network/",
      accounts,
    },
    avalanche: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts,
    },
    cronos: {
      url: "https://cronos-testnet.crypto.org:8545",
      accounts,
    },
    ethclassic: {
      url: "https://www.ethercluster.com/mordor",
      accounts,
    },
    celo: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts,
    },
    vechain: {
        url: "https://testing-bridge.xp.network/vechain/",
        accounts
    },
    harmony: {
      url: "https://api.s0.b.hmny.io",
      accounts,
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  }
};