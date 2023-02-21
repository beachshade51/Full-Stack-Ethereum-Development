const { expect } = require("chai")
const { ethers } = require("hardhat")

describe('Token', function() {
   let token;
   let owner;
   let user;

   beforeEach(async function() {
      [owner, user] = await ethers.getSigners();
      const Token = await ethers.getContractFactory('Token');
      token = await Token.deploy();
      await token.deployed();
   })

   it("should have correct name, symbol and supply", async function(){
      expect(await token.name()).to.equal("sid's test token");
      expect(await token.symbol()).to.equal('STT');
      expect(await token.totalSupply()).to.equal(1000000);
   }
   )
   it('should transfer correctly', async function(){
      //Transfer 100 tokens from owner to user
      await token.transfer(user.address, 100)
      expect(await token.balanceOf(user.address)).to.equal(100);
      expect(await token.balanceOf(owner.address)).to.equal(999900);
   })

   it('should not allow transfer of more tokens than available balance', async function(){
      const initialBalance = await token.balanceOf(owner.address);
      const transferAmount = initialBalance + 1;
      await expect(token.transfer(user.address, transferAmount)).to.be.revertedWith("not enough token");
      expect(await token.balanceOf(owner.address)).to.equal(initialBalance);
      expect(await token.balanceOf(user.address)).to.equal(0);
   })

});