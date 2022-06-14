# Contract Interfaces

In order to meet the expectation of the Multi-Chain NFT bridge inherit from the enclosed abstract contracts like so:

## Install the project
```
git clone https://github.com/XP-NETWORK/contract-interfaces.git
cd contract-interfaces/
yarn
```

## Contract deployment
Use the contracts from this repository as templates. Add your business logic without breaking the templates.

Deploy the contracts in Remix or with `hardhat`.

## Populate the environment variables
Remove the `.example` from `.env.example` and populate with relevant data
```
# Signer's secret key
SK=

# Receiver's public key (wallet address)
PK=

# Smart Contract Constants
TOKEN_TICKER=
CONTRACT_NAME="Your Collection Name Here"
NFT_PREFIX=

# Original & Target smart contract addresses:
ORIGINAL_CONTRACT=
TARGET_CONTRACT=
```

## Prerequisites for successful bridging

Follow this order:
1. Give the [Bridge smart contract](https://github.com/XP-NETWORK/xpjs/blob/secretjs/src/factory/factories.ts) the MINTER role. Search the contract by the `minter_addr` key. Mind that there are testnet and mainnet objects in this file.
2. Verify your contract on the chain
3. Renounce ownership of the contract (for security reasons)
4. Provide XP.Network team the addresses of your contract on the chains of origin and destination for proper mapping in the following format:
   1. ChainOfDepartureName: "smart contract address", e.g., From BSC:"0xB1F700B3372b2474cd799468DfbA383e74446db3"
   2. ChainOfDestinationName: "smart contract address", e.g., To Polygon: "0x5F0024035059a9703401b97fE0e0559DF16F92bE"

## Testing
1. Reset the [flags](https://github.com/XP-NETWORK/contract-interfaces/blob/master/src/index.ts#L62-L64) from `false` to `true` in turn. Only one flag must be set to `true` at all times.
2. Run the command in the terminal after every change.
```
yarn start
```
After every cycle of minting, approving and transferring, increment the NFT ID [here](https://github.com/XP-NETWORK/contract-interfaces/blob/master/src/index.ts#L31) by +1;

## Success verification
Verify your transactions in the chain explorers.