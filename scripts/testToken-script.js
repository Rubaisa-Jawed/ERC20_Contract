const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {

  // await contract.yourMethod(arg1, arg2, {gasPrice: ethers.utils.parseUnits('100', 'gwei'), gasLimit: 1000000});
  
  await hre.run('compile');
  const ERC20_test = await ethers.getContractFactory("TestToken");
  const erc20 = await ERC20_test.deploy();

  await erc20.deployed();

  console.log("Contract deployed to:", erc20.address);
  console.log(erc20.functions);
  
  const supply = await erc20.totalSupply();
  console.log("The total supply of tokens is: ", supply.toString());

  const minting = await erc20.mint('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',1000);  // ethers.utils.parseEther('10')
  minting.wait();

  const balance = await erc20.balanceOf('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
  console.log("Balance = ", balance.toString());

  const transfer1 = await erc20.transferFrom('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266','0x70997970C51812dc3A010C7d01b50e0d17dc79C8', 25);
  console.log("Transfer : ", transfer1);

  const balance2 = await erc20.balanceOf('0x70997970C51812dc3A010C7d01b50e0d17dc79C8');
  console.log("Balance = ", balance2.toString());

  const decimals = await erc20.decimals();
  console.log(decimals);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
