import { deploy } from './function';
import { config } from 'dotenv';
config();

async function main() {

    /**
     * Deploying Original.sol
     */
    const Original = await deploy("Original", process.env.CONTRACT_NAME!, process.env.TOKEN_TICKER!);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });