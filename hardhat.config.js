require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  
  networks: {

    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/e300ad24e6084c7884305f0e91546ff8',
      accounts: ['0x4fff903c8fa78a6a5d56288406e3f3bee10e9207749e0ca0962ada9a93b761c0'],
      // maxFeePerGas = hre.ethers.utils.parseUnits('100', 'gwei'),
      // maxPriorityFeePerGas = hre.ethers.utils.parseUnits('5', 'gwei')
    },

    hardhat: {
      // gas: 2000000,
      // gasPrice: 9750000000
      // maxFeePerGas = hre.ethers.utils.parseUnits('100', 'gwei'),
      // maxPriorityFeePerGas = hre.ethers.utils.parseUnits('5', 'gwei')
    },

    
  }
};
