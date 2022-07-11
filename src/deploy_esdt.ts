import { UserSigner } from "@elrondnetwork/erdjs/out"
import { AppConfigs, Chain, ChainFactory, ChainFactoryConfigs } from "xp.network"
import { config } from 'dotenv';
config();

(async () => {
    const factory = ChainFactory(AppConfigs.TestNet(), await ChainFactoryConfigs.TestNet())

    if (process.env.ELROND_PEM!) {

        const signer = UserSigner.fromPem(process.env.ELROND_PEM!);

        const elrond = await factory.inner(Chain.ELROND)

        const response = await elrond.issueESDTNft(
            signer,
            "Target",
            "TGT",
            true, // canFreeze
            true, // canWipe
            true  // canTransferNftCreateRole
        ); 

        console.log(response);
    } else {
        console.log("Missing ELROND_PEM");
    }

    process.exit(0);
})().catch((e) => {
    console.log(e.message);
    process.exit(1);
});
