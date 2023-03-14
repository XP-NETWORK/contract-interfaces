// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

// A contract which supports minting individual nfts
abstract contract BridgeNFT {
    /* Mint a new NFT
    mintArgs are not supposed to be passed to the receiver but rather,
    must be used for custom logic in this contract (if any)
    */
    function mint(
        address to,
        uint256 id,
        bytes calldata mintArgs
    ) external virtual;

    // Burn an NFT
    function burnFor(address to, uint256 id) external virtual;

    /* Base URL of the contract
        Must follow the ERC1155Metadata_URI extension's {id} based format
    */
    function baseURI() external virtual returns (string memory);
}

contract Target is ERC721Enumerable, BridgeNFT {
    using Strings for uint256;

    string public baseUri;
    address private _admin;
    address private _minter;

    modifier onlyAdmin() {
        require(
            msg.sender == _admin,
            "You're not an admin. Unauthorised funciton call"
        );
        _;
    }

    modifier onlyMinter() {
        require(
            msg.sender == _minter,
            "You're not a Minter. Unauthorised funciton call"
        );
        _;
    }

    // WARNING: baseURI_ MUST be "/" suffixed
    constructor(
        string memory name_,
        string memory symbol_,
        string memory baseURI_,
        address minter
    ) ERC721(name_, symbol_) {
        baseUri = baseURI_;
        _minter = minter;
        _admin = msg.sender;
    }

    function mint(
        address to,
        uint256 id,
        bytes calldata
    ) external override onlyMinter {
        _safeMint(to, id);
    }

    function burnFor(address from, uint256 id) external override onlyMinter {
        require(ownerOf(id) == from, "You don't own this nft!");
        _burn(id);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        _requireMinted(tokenId);
        return
            bytes(_baseURI()).length > 0
                ? string(abi.encodePacked(_baseURI(), tokenId.toString()))
                : "";
    }

    function _baseURI() internal view override returns (string memory) {
        return baseUri;
    }

    function baseURI() external view override returns (string memory) {
        return string(abi.encodePacked(_baseURI(), "{id}"));
    }

    function setMinter(address newMinter) external onlyAdmin {
        _minter = newMinter;
    }

    function resetURI(string memory baseURI_) external onlyAdmin {
        baseUri = baseURI_;
    }
}
