const { expect } = require("chai");
const { ethers } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("TestToken Unit Test", () => {

    let erc20;
    let erc20TestToken;
    let addr0;
    let addr1;
    let addr2;

    beforeEach(async function () {
        erc20TestToken = await ethers.getContractFactory("TestToken");
        [addr0, addr1, addr2] = await ethers.getSigners();
        erc20 = await erc20TestToken.deploy();
    });

    // it("should fail if Tokens minted to zero address", async() => {    
    //     const zero = address(0); 0x000000...
    //     await expect(erc20.mint(zero,100)).to.be.revertedWith("Not functional with zero Address!");
    // }); Not necessary!

    describe("Basic", function () {

        it("should assign total supply of tokens to the addr0", async function () {
            const ownerBalance = await erc20.balanceOf(addr0.address);
            expect(await erc20.totalSupply()).to.equal(ownerBalance);
        });

    });

    describe("Approval", function () {

        it("should approve a set number of tokens for an address", async function () {

            await erc20.transfer(addr1.address, 200);
            const addr1Balance = await erc20.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(200);

            await erc20.approve(addr1.address, 200);

            await erc20.connect(addr1).transferFrom(addr0.address, addr2.address, 100);
            const addr2Balance = await erc20.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(100);
        });

        it("should emit an Approval event at successful approval", async function () {
            await expect(erc20.approve(addr1.address, 100)).to.emit(erc20, 'Approval').withArgs(addr0.address, addr1.address, 100);
        });
    });

    describe("Transfer", function () {

        it("should transfer tokens from addr0 to other account", async function () {
            //transfer 100 tokens to address 1 from addr0
            await erc20.transfer(addr1.address, 100);
            const addr1Balance = await erc20.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(100);
        });

        it("should transfer tokens from one address to another", async function () {
            //transfer 100 tokens to address 1 from addr0
            await erc20.transfer(addr1.address, 100);
            const addr1Balance = await erc20.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(100);

            //transfer 100 tokens from address 1 to address 2
            await erc20.connect(addr1).transfer(addr2.address, 100);
            const addr2Balance = await erc20.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(100);
        });

        it("should transfer tokens from one address to another using transferFrom", async function () {
            //transfer 100 tokens to address 1 from addr0
            await erc20.transferFrom(addr0.address, addr1.address, 100);
            const addr1Balance = await erc20.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(100);
        });

        it("should return fail if sender tries to send more tokens then their balance", async function () {
            //sending 50 tokens from address 1 (balance = 0) to addr0.
            //statement should be reverted.
            const initialOwnerBal = await erc20.balanceOf(addr0.address);
            await expect(erc20.connect(addr1).transfer(addr0.address, 50)).to.be.revertedWith("Number of tokens to be transferred surpass the ones in account");
            //checking addr0 balance remains the same
            expect(await erc20.balanceOf(addr0.address)).to.equal(initialOwnerBal);
        });

        it("should emit a Transfer event at successful transfer", async function () {
            await expect(erc20.transfer(addr1.address, 100)).to.emit(erc20, 'Transfer').withArgs(addr0.address, addr1.address, 100);
        });

        it("should update balance after transfer", async function () {
            const initialOwnerBal = await erc20.balanceOf(addr0.address);

            await erc20.transfer(addr1.address, 100);
            await erc20.transfer(addr2.address, 200);

            const finalOwnerBalance = await erc20.balanceOf(addr0.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBal - 300);

            const addr1Balance = await erc20.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(100);

            const addr2Balance = await erc20.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(200);
        });
    });
});