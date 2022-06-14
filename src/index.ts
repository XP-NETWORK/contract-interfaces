import {
    ChainFactoryConfigs, ChainFactory,
    AppConfigs,
    NftMintArgs, Chain, Web3Helper, NftInfo
} from "xp.network";
import { config } from 'dotenv';
config();

// EVM chains compatible wallet:
import { Wallet } from "ethers";
import {
    mint,
    transferNft,
    testnetConfig
} from './functions';

import { getNftInfo, ContractType } from "./nft_info";

/**
 * Constants
 */
 const originContract:string = "";
 const targetContract:string = "";
 const uris: string[] = [
    'https://meta.polkamon.com/meta?id=10001419693'
 ];

/**
 * NFT Object
 */
const selected: NftInfo<any> = getNftInfo(
    // NFT Metadata URI
    uris[0],
    // Chain of departure nonce
    Chain.BSC.toString(),
    // NFT ID
    "0",
    // NFT Owner
    "0x0d7df42014064a163DfDA404253fa9f6883b9187",
    // Original NFT smart contract
    originContract,
    // NFT contract token symbol
    'UMT',
    // Collection Name
    'UserNftMinter',
    // Contract Type
    ContractType.ERC721
);



(async () => {

    // Flags for running parts of the script:
    const shallMint = false;
    const shallApprove = false;
    const shallTransfer = true;

    // Creation of the testnet Factory
    const factory = ChainFactory(AppConfigs.TestNet(), await testnetConfig);

    // Initiating chain inner objects to manipulate with:
    const bsc = await factory.inner(Chain.BSC);
    const polygon = await factory.inner(Chain.POLYGON);

    if(shallMint){ // ======== MINTING ==============================
        const mintingResult = await mint(bsc, uris, originContract, factory);
        console.log("Minted:", mintingResult);
    }

    if (shallApprove){ // ==== APPROVING ============================
        const signer = new Wallet(process.env.SK!, bsc.getProvider());
        const approved = await bsc.approveForMinter(selected, signer);
        console.log(`Approved: ${approved}`);
    }

    if(shallTransfer){ // ==== TRANSFERRING =========================
        const result = await transferNft(
            bsc, 
            polygon, 
            selected, 
            factory, 
            targetContract
        );
        console.log("Transfer result:", result);
    }

    process.exit(0);
})().catch((error: any) => {
    console.error("Error:", error);
    process.exit(1);
});