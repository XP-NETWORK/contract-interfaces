import {
    ChainFactoryConfigs, ChainFactory,
    AppConfigs,
    NftMintArgs, Chain, Web3Helper, NftInfo
} from "xp.network";
import { config } from 'dotenv';
config();

// EVM chains compatible wallet:
import { Wallet } from "ethers";

export const testnetConfig = ChainFactoryConfigs.TestNet();

export const mint = async (departureChain: Web3Helper, uris: String[], contract: string, factory: ChainFactory) => {

    const signer = new Wallet(process.env.SK!, departureChain.getProvider());

    for await (const uri of uris) {

        const nftResult = await factory.mint(
            departureChain,
            signer,
            {
                contract,
                uris: [uri]
            } as NftMintArgs
        );
        console.log(`Done ${uri}`, nftResult);
    }
}

export const nftList = async (departureChain: Web3Helper, chainName: string, factory: ChainFactory) => {

    const signer = new Wallet(process.env.SK!, departureChain.getProvider());
    console.log(`Listing NFTs for ${chainName}:`);

    const NFTs = await factory.nftList(
        departureChain,
        signer.address
    );
    console.log(`On ${chainName} Found NFTs:`, NFTs.length);
    return NFTs;
}

export const transferNft = async (departureChain: Web3Helper, destinationChain: Web3Helper, selNFT: NftInfo<unknown>, factory: ChainFactory, mintwith: string|undefined) => {

    const signer = new Wallet(process.env.SK!, departureChain.getProvider());
    console.log(`Transferring NFT...`);

    return await factory.transferNft(
        departureChain,
        destinationChain,
        selNFT,
        signer,
        signer.address,
        undefined,
        mintwith,
        undefined
    )
}