require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/krkR_Z2XM5UCPVjRXL-W9ygsFo6tFk-u",
      accounts: [
        "98c9c7c6f987050442c6acd6e6119dfdc8d657af89abec2b1cb237408901a6d5",
      ],
    },
  },
};
