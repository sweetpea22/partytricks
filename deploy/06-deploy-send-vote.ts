import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../deploy-helpers"
import { networkConfig, developmentChains, gatewayGoerli, gasServiceGoerli, gasServiceFuji, gatewayFuji } from "../deploy-config"
import { ethers } from "hardhat"

const deploySendVoteCrossChain: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const argsGoerli = [
      gatewayGoerli,
      gasServiceGoerli
  ]
  const argsFuji = [
      gatewayFuji,
      gasServiceFuji
  ]
  log("----------------------------------------------------")
  log("Deploying sendVoteCrossChain and waiting for confirmations...")
  const sendVoteCrossChainGoerli = await deploy("SendVoteCrossChain", {
    from: deployer,
    args: argsGoerli,
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`sendVoteCrossChain deployed on Goerli at ${sendVoteCrossChainGoerli.address}\n`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(sendVoteCrossChainGoerli.address, [])
  }
  const sendVoteCrossChainFuji = await deploy("SendVoteCrossChain", {
    from: deployer,
    args: argsFuji,
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`sendVoteCrossChain deployed on Fuji at ${sendVoteCrossChainFuji.address}\n`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(sendVoteCrossChainFuji.address, [])
  }
}

export default deploySendVoteCrossChain
deploySendVoteCrossChain.tags = ["all", "sendVoteCrossChain"]

