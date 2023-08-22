import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"
import "hardhat-gas-reporter"
import "dotenv/config"
import "solidity-coverage"
import "@nomicfoundation/hardhat-verify"
import "hardhat-deploy"
import { HardhatUserConfig } from "hardhat/config"

const GOERLI_RPC_URL =
  process.env.GOERLI_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "privateKey"
const AVALANCHE_TEST_PRIVATE_KEY = process.env.AVALANCHE_TEST_PRIVATE_KEY || "privateKey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const SNOWTRACE_API_KEY = process.env.SNOWTRACE_API_KEY || ""
const BASE_EXPLORER_API_KEY = process.env.BASE_EXPLORER_API_KEY || ""

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
   networks: {
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true
    },
    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize: true
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      gasPrice: 225000000000,
      chainId: 5,
     },
     avalancheTest: {
      url: 'https://avalanche-fuji.infura.io/v3/',
      accounts: [AVALANCHE_TEST_PRIVATE_KEY],
      gasPrice: 225000000000,
      chainId: 43113
    },
    baseGoerli: {
      url: 'https://base-goerli.public.blastapi.io',
      accounts: [PRIVATE_KEY],
      gasPrice: 225000000000,
       chainId: 84531,
     }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: { goerli: ETHERSCAN_API_KEY, avalanche: SNOWTRACE_API_KEY, base: BASE_EXPLORER_API_KEY }
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },

}

export default config