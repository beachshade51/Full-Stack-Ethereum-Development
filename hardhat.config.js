require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({path:__dirname+'/.env'})

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths: {
   artifacts: './src/artifacts'
  },
  networks: {
   hardhat: {
      chainId: 1337
   },
   goerli: {
      url: "https://goerli.infura.io/v3/3c9e30226e44450e8461920da8726fcb",
      accounts: [process.env.private_key]
   }
  }
};
