# Contract Interfaces

In order to meet the expectation of the Multi-Chain NFT bridge inherit from the enclosed abstract contracts like so:

## For ERC-721

```js
import "./BridgeNFT.sol";
contract YourContractName is BridgeNFT {
    // ... your contract body here
}

```

## For ERC-721A & ERC-1155

```js
import "./BridgeNFTBatch.sol";
contract YourContractName is BridgeNFTBatch {
    // ... your contract body here
}

```

## Prerequisites for successful bridging

Follow this order:
1. Give the Bridge smart contract the MINTER role
2. Verify your contract on the chain
3. Renounce ownership of the contract (for security reasons)
4. Provide XP.Network team the addresses of your contract on the chains of origin and destination for proper mapping
5. In case of using the bridge from XPJS add the target smart contract as one of the arguments like so:
   ```js
    transferNft: async (
      fromChain, // the inner object of the chain of departure
      toChain,   // the inner object of the chain of destination
      nft,       // sellected NFT(s)
      sender,     
      receiver,  
      fee,       // = await estimateFees(fromChain, toChain, nft, receiver);
      mintWith,  // <=========== Obligatory target chain contract address
      gasLimit   // optional gas fee limit
    )
   ```