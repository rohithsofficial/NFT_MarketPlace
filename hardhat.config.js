require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables

module.exports = {
  solidity: "0.8.9",
  networks: {
    localhost: {
      url: "http://127.0.0.1:7545", // Ganache RPC URL
      accounts: [process.env.PRIVATE_KEY] // Use private key from .env
    }
  }
};
