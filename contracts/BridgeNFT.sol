// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13; 

/**
* Required for ERC721 & ERC-721A while transaferring individual NFTs
*/
abstract contract BridgeNFT {

    /* Mint a new NFT
    mintArgs are not supposed to be passed to the receiver but rather,
    must be used for custom logic in this contract (if any)
    */
    function mint(address to, uint256 id, bytes calldata mintArgs) external virtual;
    
    // Burn an NFT
    function burnFor(address to, uint256 id) external virtual;

    /* Base URL of the contract
    Must follow the ERC1155Metadata_URI extension's {id} based format
    */
    function baseURI() external virtual returns (string memory);
}