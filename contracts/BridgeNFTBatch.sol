// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 

import "./BridgeNFT.sol";

/**
* Required for ERC-1155 / ERC721A while transferring NFTs / SFTs in batches
*/

abstract contract BridgeNFTBatch is BridgeNFT {

    /* Mint multiple NFTs
    mintArgs are not supposed to be passed to the receiver but rather,
    must be used for custom logic in this contract (if any)
    In the current version, its safe to assume that amounts is an aray of ones
    */
    function mintBatch(address to, uint256[] calldata ids, uint256[] calldata amounts, bytes calldata mintArgs) external virtual;

    // Burn Multiple nfts
    // In the current version, its safe to assume that amounts is an aray of ones
    function burnBatchFor(address from, uint256[] calldata ids, uint256[] calldata amounts) external virtual;
}