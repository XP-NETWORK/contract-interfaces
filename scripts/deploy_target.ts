import { deploy } from './function';
import { config } from 'dotenv';
config();

async function main() {

    /**
     * Deploying Target.sol
     */
    const Original = await deploy(
        "Target",
        process.env.TARGET_NAME!,
        process.env.TARGET_SYMBOL!,
        process.env.NFT_PREFIX!
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });