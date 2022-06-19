# Smart Contracts' Mapping Guide

There are two ways of transferring NFTs via the XP.NETWORK Bridge.

1. The first option does not require coding or deploying smart contracts. The tokens can be sent from chain A to chain B using the existing infrastructure with minimal effort in a matter of minutes.<br/> However, in this case, the wrapped assets will arrive at the default smart contracts meeting the requirements of the token standards but will have a universal collection name, e.g., "Wrapped NFTs," and will be void of any custom logic, including royalties.
2. To preserve a collection name or any business logic required for a game, a marketplace, a metaverse, a DeFi app, or a collection with royalties, deployment of custom smart contracts is required on the destination chain.

This brief tutorial will show you how to write, deploy, set up, and test two contracts mapped by the XP.NETWORK bridge.

The contract templates enclosed in the repository barely support the functionality of mapped bridging. Any additional business logic is at the discretion of the NFT project.

We recommend that all the smart contracts deployed on the mainnets undergo thorough testing in the testnets of the blockchains, followed by security audits by the industry-acknowledged auditing companies.

The video below will walk you through the process of implementing the steps described below.

## 0. Installing the project

```
git clone https://github.com/XP-NETWORK/contract-interfaces.git
cd contract-interfaces/
yarn
tsc
```

## 1. Populating the environment variables
Remove the `.example` from `.env.example` and populate with relevant data

 Hardcode the `private key` from your elliptical curve key pair here:
 ```
 # Signer's secret key
 SK=
 ```
 Hardcode the `public key` for the account you're sending the tokens to here:
```
 # Receiver's public key (wallet address)
 PK=
 ```
 # Original Smart Contract Constants
 Give the name and the token ticker to your contract on the chain of departure here:
 ```
 # Example values:

 TOKEN_TICKER=OCE
 CONTRACT_NAME="Original Contract Example"
 ```
Provide the values for the constructor of the smart contract on the chain of destination here:
 ```
# Example values:

 # Target Smart Contract Constants
 TARGET_NAME=Target
 TARGET_SYMBOL=TGT
 NFT_PREFIX=https://bridge-wnftapi.herokuapp.com/w/
```

## 2. Deploying the Original chain Contract

To deploy the SC on the chain of departure, run the following command in the terminal from the root folder of the contract-interfaces project.
```
npx hardhat run dist/scripts/deploy_original.js --network <your chain name>
```

## 3. Deploying the Target Contract

To deploy the SC on the destination chain, run the following command in the terminal from the root folder of the contract-interfaces project.
```
npx hardhat run dist/scripts/deploy_target.js --network <your chain name>
```

## 4. Setting-Up

Follow this order:
1. Give the [Bridge smart contract](https://github.com/XP-NETWORK/xpjs/blob/secretjs/src/factory/factories.ts) the MINTER role. Search the contract by the `minter_addr` key. Mind that there are testnet and mainnet objects in this file.
2. Verify your contract on the chain
3. Renounce ownership of the contract (for security reasons)
4. Provide the XP.Network team (via  email: contact@xp.network) the addresses of your contract on the chains of origin and destination for proper mapping in the following format:
   1. ChainOfDepartureName: "smart contract address", e.g.,<br/> From BSC:"0xB1F700B3372b2474cd799468DfbA383e74446db3"
   2. ChainOfDestinationName: "smart contract address", e.g.,<br/> To Polygon: "0x5F0024035059a9703401b97fE0e0559DF16F92bE"

## 5. Testing
1. Populate the `.env` file with the addresses of the deployed contracts according to the example:
   ```
   # Original & Target smart contract addresses:
   
   ORIGINAL_CONTRACT=0xB1F700B3372b2474cd799468DfbA383e74446db3
   TARGET_CONTRACT=0x5F0024035059a9703401b97fE0e0559DF16F92bE
   ```
2. Reset the [flags](https://github.com/XP-NETWORK/contract-interfaces/blob/master/src/index.ts#L62-L64) from `false` to `true` in turn. Only one flag must be set to `true` at all times.
3. Run the command in the terminal after every change.
   ```
   yarn start
   ```
After every minting, approving, and transferring cycle, increment the NFT ID [here](https://github.com/XP-NETWORK/contract-interfaces/blob/master/src/index.ts#L31) by +1 if you wish to repeat the cycle.

## 6. Success verification
Verify your transactions in the chain explorers. To find the relevant transactions, query the explorers by the public keys of the sender on the chain of departure and the receiver's public key on the destination chain. Alternatively, you can check the most recent transactions of the contracts you deployed on the chain chains of origin and destination.
