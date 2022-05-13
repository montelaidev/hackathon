const hre = require("hardhat");

async function main() {
    const McDonaldsApp = await hre.ethers.getContractFactory("McDonaldsApp");
    const mcDonaldsApp = await McDonaldsApp.deploy();
  
    await mcDonaldsApp.deployed();
  
    console.log("McDonaldsApp deployed to:", mcDonaldsApp.address);
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });