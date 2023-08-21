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
export const QUORUM_PERCENTAGE = 100 // Need 4% of voters to pass
export const MIN_DELAY = 450 // .5hrs 

// export const VOTING_PERIOD = 45818 // 1 week - how long the vote lasts. This is pretty long even for local tests
export const VOTING_PERIOD = 5 // blocks
export const VOTING_DELAY = 1 // 1 Block - How many blocks till a proposal vote becomes active
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"

export const FUNC = "addWinner"

//get these from UI instead
export const POTENTIAL_WINNER = "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720"

export const PROPOSAL_DESCRIPTION = "Because I say so!"

// if we use the script only
export const proposalsFile = "proposals.json"

// goerli axelar contract address
export const gatewayGoerli = "0xe432150cce91c13a887f7D836923d5597adD8E31"
export const gasServiceGoerli = "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6"

// ava axelar contract address
export const gatewayFuji = "0xC249632c2D40b9001FE907806902f63038B737Ab"
export const gasServiceFuji = "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6"