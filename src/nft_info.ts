import { NftInfo } from "xp.network";

export const getNftInfo = (
    uri:string, 
    chainId:string,
    tokenId:string,
    owner:string,
    contract:string,
    symbol:string,
    name:string,
    contractType:string
    ) => {
    return {
        uri,
        native: {
            chainId,
            tokenId,
            owner,
            contract,
            symbol,
            name,
            uri,
            contractType
        },
        collectionIdent: contract
    };
};

export enum ContractType {
    ERC721='ERC721',
    ERC1155='ERC1155'
}