const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {


  // await hre.run("compile");
  const accounts = await hre.ethers.getSigners();
  const ERC20_test = await ethers.getContractFactory("TestToken");
  const testTokenAddress = '0xe151152d524ccae54ae9e2572c1168f521bce42c';
  const erc20 = new ethers.Contract(testTokenAddress, ERC20_test.interface, accounts[0]);
  // const erc20 = await ERC20_test.deploy({
  //   maxFeePerGas : ethers.utils.parseUnits("100", "gwei"),
  //   maxPriorityFeePerGas : ethers.utils.parseUnits("5", "gwei")
  // });

  // await erc20.deployed();

  // // await erc20.yourMethod(arg1, arg2, {gasPrice: ethers.utils.parseUnits("100", "gwei"), gasLimit: 1000000});

  // console.log("Contract deployed to:", erc20.address);
  // console.log(erc20.functions);

  // await erc20.transferFrom({gasPrice: ethers.utils.parseUnits("100", "gwei"), gasLimit: 1000000});

  const supply = await erc20.totalSupply();
  console.log("The total supply of tokens is: ", supply.toString());

  const minting = await erc20.mint("0x621812bF225D4A7bF6e2bCA6eBa63Ce957E3cDe9",  ethers.utils.parseUnits("10000" , "ether"), {
    maxFeePerGas : ethers.utils.parseUnits("99" , "gwei"),
    maxPriorityFeePerGas : ethers.utils.parseUnits("7", "gwei")
  });  // ethers.utils.parseEther("10")
  minting.wait();

  // const newsupply = await erc20.totalSupply();
  // console.log("The new total supply of tokens is: ", newsupply.toString());

  // const balance = await erc20.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
  // console.log("Balance of Address 1 = ", balance.toString());

  // const balance2 = await erc20.balanceOf("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
  // console.log("Balance of Address 2 = ", balance2.toString());

  // const transfer1 = await erc20.transferFrom("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", 120, {
  //   maxFeePerGas : ethers.utils.parseUnits("104", "gwei"),
  //   maxPriorityFeePerGas : ethers.utils.parseUnits("10", "gwei")
  // });
  // console.log("Transfer called...")
  // console.log("Transfer : ", transfer1);

  // const newbalance = await erc20.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
  // console.log("New Balance of Address 1 = ", newbalance.toString());

  // const newbalance2 = await erc20.balanceOf("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
  // console.log("New Balance of Address 2 = ", newbalance2.toString());

  // const decimals = await erc20.decimals();
  // console.log(decimals);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
