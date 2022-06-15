import * as hre from "hardhat";

async function deploy<T extends unknown[]>(contract_name: string, ...args: T) {
	const Contract = await hre.ethers.getContractFactory(contract_name);
	console.log(`Deploying ${contract_name}..`);
	const contract = await Contract.deploy(...args);
	await contract.deployed();
	console.log(`${contract_name} deployed to: ${contract.address}`);
	return contract;
}

async function main() {

    /**
     * Deploying Original.sol
     */
     const Original = await deploy("Original");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });