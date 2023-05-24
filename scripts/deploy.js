
const hre = require("hardhat");

async function main() {

  const Tracking = await hre.ethers.getContractFactory("Tracking");
  const Tracking = await Tracking.deploy();

  await lock.deployed();

  console.log(
    `Tracking deployed to ${Tracking.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
