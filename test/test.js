const { expect } = require("chai")

describe("Greeter", function() {
   it("Should return the new greeting once it's changed", async function()
      {
         const Greeter = await ethers.getContractFactory("Greeter");
         const greeter = await Greeter.deploy("Hello");

         expect(await greeter.greet()).to.equal("Hello");

         const setGreetingTx = await greeter.setGreeting("Hello sid");
         await setGreetingTx.wait();

         expect(await greeter.greet()).to.equal("Hello sid");
   });
});
