// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// This is just as dummy contract for testing
// DONT USE IN PRODUCTION!
contract OriginalContractExample is ERC721URIStorage {
    uint256 public tokenId = 0;

    constructor() ERC721("Original Contract Example", "OCE") {} // solhint-disable-line no-empty-blocks

    function mint(string calldata uri) external {
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        tokenId += 1;
    }

    function burn(uint256 id) external {
        address owner = ownerOf(id);
        require(owner == msg.sender, "caller doesn't own this nft");
        _burn(id);
    }
}