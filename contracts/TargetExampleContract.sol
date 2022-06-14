// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13; 

import "./BridgeNFT.sol";
import "./Roles/Minter.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract TargetExampleContract is Ownable, ERC721Enumerable, BridgeNFT, MinterRole {
    string public baseUri;

    // WARN: baseURI_ MUST be "/" suffixed
    constructor(
        string memory name_, 
        string memory symbol_, 
        string memory baseURI_
    ) ERC721(name_, symbol_) external {
        baseUri = baseURI_;
    }

	function mint(address to, uint256 id, bytes calldata) override external onlyMinter {
		_safeMint(to, id);
	}

	function burnFor(address from, uint256 id) override external {
        require(ownerOf(id) == from, "You don't own this nft!");
		_burn(id);
	}

    function _baseURI() internal view override returns (string memory) {
        return baseUri;
    }

    function baseURI() override external view returns (string memory)  {
        return string(abi.encodePacked(baseUri, "{id}"));
    }

    function resetURI(string memory baseURI_) external onlyOwner {
        baseUri = baseURI_;
    }
}