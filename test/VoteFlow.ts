//@ts-ignore
import { GovernorContract, GovernanceToken, TimeLock, Escrow } from "../typechain-types"
import { deployments, ethers } from "hardhat"
import { assert, expect } from "chai"
import {
  FUNC,
  PROPOSAL_DESCRIPTION,
  POTENTIAL_WINNER,
  VOTING_DELAY,
  VOTING_PERIOD,
  MIN_DELAY,
} from "../deploy-config"
import { moveBlocks } from "../utils/move-blocks"
import { moveTime } from "../utils/move-time"

describe("Governor Flow", async () => {
  let governor: GovernorContract
  let governanceToken: GovernanceToken
  let timeLock: TimeLock
  let escrow: Escrow
  const voteWay = 1 // for
  const reason = "I lika do da cha cha"
  beforeEach(async () => {
    await deployments.fixture(["all"])
    governor = await ethers.getContract("GovernorContract")
    timeLock = await ethers.getContract("TimeLock")
    governanceToken = await ethers.getContract("GovernanceToken")
    escrow = await ethers.getContract("Escrow")
  })

  it("can only be changed through governance", async () => {
    //@ts-ignore
    await expect(escrow.addWinner("0x4fFC20C398B936063eeb360f670890de4EBC649b")).to.be.RevertedWith("Ownable: caller is not the owner")
  })

  // it("proposes, votes, waits, queues, and then executes", async () => {
  //   // propose
  //   const encodedFunctionCall = escrow.interface.encodeFunctionData(FUNC, [POTENTIAL_WINNER])
  //   const proposeTx = await governor.propose(
  //     [escrow.address],
  //     [0],
  //     [encodedFunctionCall],
  //     PROPOSAL_DESCRIPTION
  //   )

  //   const proposeReceipt = await proposeTx.wait(1)
  //   const proposalId = proposeReceipt.events![0].args!.proposalId
  //   let proposalState = await governor.state(proposalId)
  //   console.log(`Current Proposal State: ${proposalState}`)

  //   await moveBlocks(VOTING_DELAY + 1)
  //   // vote
  //   const voteTx = await governor.castVoteWithReason(proposalId, voteWay, reason)
  //   await voteTx.wait(1)
  //   proposalState = await governor.state(proposalId)
  //   assert.equal(proposalState.toString(), "1")
  //   console.log(`Current Proposal State: ${proposalState}`)
  //   await moveBlocks(VOTING_PERIOD + 1)

  //   // queue & execute
  //   // const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION))
  //   const descriptionHash = ethers.utils.id(PROPOSAL_DESCRIPTION)
  //   const queueTx = await governor.queue([escrow.address], [0], [encodedFunctionCall], descriptionHash)
  //   await queueTx.wait(1)
  //   await moveTime(MIN_DELAY + 1)
  //   await moveBlocks(1)

  //   proposalState = await governor.state(proposalId)
  //   console.log(`Current Proposal State: ${proposalState}`)

  //   console.log("Executing...")
  //   console.log
  //   const exTx = await governor.execute([escrow.address], [0], [encodedFunctionCall], descriptionHash)
  //   await exTx.wait(1)
  //   console.log((await escrow.retrieve()).toString())
  // })

  // send vote cross chain

})

