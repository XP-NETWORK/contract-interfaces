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