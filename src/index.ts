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
 * Constants imported from the environment:
 */
const originContract: string = process.env.ORIGINAL_CONTRACT!;
const targetContract: string = process.env.TARGET_CONTRACT!;
const nftOwner: string = process.env.PK!;
const tokenTicker: string = process.env.TOKEN_TICKER!;
const contractName: string = process.env.CONTRACT_NAME!;

/**
* Set the Constants before running:
*/
const nftCounter: number = 0;
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
    nftCounter.toString(),
    // NFT Owner
    nftOwner,
    // Original NFT smart contract
    originContract,
    // NFT contract token symbol
    tokenTicker,
    // Collection Name
    contractName,
    // Contract Type
    ContractType.ERC721
);


(async () => {

    // Flags for running parts of the script:
    const shallMint = false;
    const shallApprove = false;
    const shallTransfer = false;

    // Creation of the testnet Factory
    const factory = ChainFactory(AppConfigs.TestNet(), await testnetConfig);

    // Initiating chain inner objects to manipulate with:
    const bsc = await factory.inner(Chain.BSC);
    const polygon = await factory.inner(Chain.POLYGON);

    if (shallMint) { // ======== MINTING ==============================
        const mintingResult = await mint(bsc, uris, originContract, factory);
    }

    if (shallApprove) { // ==== APPROVING ============================
        const signer = new Wallet(process.env.SK!, bsc.getProvider());
        const approved = await bsc.approveForMinter(selected, signer);
        console.log(`Approved: ${approved}`);
    }

    if (shallTransfer) { // ==== TRANSFERRING =========================
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