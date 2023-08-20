import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../deploy-helpers"
import { networkConfig, developmentChains } from "../deploy-config"
import { ethers } from "hardhat"

const deployEscrow: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("----------------------------------------------------")
  log("Deploying escrow and waiting for confirmations...")
  const escrow = await deploy("Escrow", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`Escrow at ${escrow.address}`)
  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(escrow.address, [])
  }
  const escrowContract = await ethers.getContractAt("Escrow", escrow.address)
  //@ts-ignore
  const timeLock = await ethers.getContract("TimeLock")
  //timelock address owns the escrow contract
  const transferTx = await escrowContract.transferOwnership(timeLock.address)
  await transferTx.wait(1)
}

export default deployEscrow
deployEscrow.tags = ["all", "escrow"]
