export interface networkConfigItem {
  blockConfirmations?: number
}
export interface networkConfigInfo {
  [key: string]: networkConfigItem
}
export const networkConfig: networkConfigInfo = {
  localhost: {},
  hardhat: {},
  sepolia: {
    blockConfirmations: 6,
  },
}
export const developmentChains = ["hardhat", "localhost"]

// Governance Token Values
export const governanceTokenAddress = ""

// Governor Values
export const QUORUM_PERCENTAGE = 4 // Need 4% of voters to pass
export const MIN_DELAY = 1800 // .5hrs 

// export const VOTING_PERIOD = 45818 // 1 week - how long the vote lasts. This is pretty long even for local tests
export const VOTING_PERIOD = 5 // blocks
export const VOTING_DELAY = 1 // 1 Block - How many blocks till a proposal vote becomes active
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"

export const FUNC = "sendReward"

//get these from UI instead
export const NEW_STORE_VALUE = 77
export const PROPOSAL_DESCRIPTION = "Because I say so!"

// if we use the script only
export const proposalsFile = "proposals.json"